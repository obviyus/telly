#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# ///

import argparse
import importlib.util
import json
import sys
import time
from pathlib import Path


DRIVER_PATH = Path(__file__).with_name("user-driver.py")
_spec = importlib.util.spec_from_file_location("tg_user_driver", DRIVER_PATH)
driver = importlib.util.module_from_spec(_spec)
sys.modules["tg_user_driver"] = driver
_spec.loader.exec_module(driver)


def authorized_driver():
    config, bot_config = driver.load_config()
    client = driver.UserDriver(config, bot_config)
    client.authorize(need_ready=True)
    return config, bot_config, client


def administrator_rights():
    return {
        "@type": "chatAdministratorRights",
        "can_manage_chat": True,
        "can_change_info": True,
        "can_post_messages": False,
        "can_edit_messages": False,
        "can_delete_messages": True,
        "can_invite_users": True,
        "can_restrict_members": True,
        "can_pin_messages": True,
        "can_manage_topics": True,
        "can_promote_members": True,
        "can_manage_video_chats": True,
        "can_post_stories": True,
        "can_edit_stories": True,
        "can_delete_stories": True,
        "can_manage_direct_messages": False,
        "can_manage_tags": True,
        "can_send_welcome_messages": True,
        "is_anonymous": False,
    }


def configured_group_id(config, bot_config):
    configured = driver.default_chat(config, bot_config)
    if configured and configured.lstrip("-").isdigit():
        return int(configured)
    return None


def reusable_fixture(chat_id, chat_type, group, bot_status, excluded_chat_id):
    if chat_id == excluded_chat_id or group.get("member_count") != 2:
        return False
    if (group.get("status") or {}).get("@type") != "chatMemberStatusCreator":
        return False
    if (bot_status or {}).get("@type") in {
        None,
        "chatMemberStatusLeft",
        "chatMemberStatusBanned",
    }:
        return False
    if chat_type.get("@type") == "chatTypeBasicGroup":
        return True
    return (
        chat_type.get("@type") == "chatTypeSupergroup"
        and not group.get("is_channel", False)
    )


def group_details(user, chat):
    chat_type = chat.get("type") or {}
    if chat_type.get("@type") == "chatTypeBasicGroup":
        return user.client.request(
            {"@type": "getBasicGroup", "basic_group_id": chat_type["basic_group_id"]},
            timeout=30,
        )
    if chat_type.get("@type") == "chatTypeSupergroup":
        return user.client.request(
            {"@type": "getSupergroup", "supergroup_id": chat_type["supergroup_id"]},
            timeout=30,
        )
    return None


def find_reusable_group(user, config, bot_config, sut_id):
    excluded_chat_id = configured_group_id(config, bot_config)
    chats = user.client.request(
        {"@type": "getChats", "chat_list": {"@type": "chatListMain"}, "limit": 200},
        timeout=30,
    )
    candidates = []
    for chat_id in chats.get("chat_ids") or []:
        try:
            chat = user.client.request({"@type": "getChat", "chat_id": chat_id}, timeout=30)
            group = group_details(user, chat)
            if group is None:
                continue
            bot = user.client.request(
                {
                    "@type": "getChatMember",
                    "chat_id": chat_id,
                    "member_id": {"@type": "messageSenderUser", "user_id": sut_id},
                },
                timeout=30,
            )
            if reusable_fixture(
                chat_id,
                chat.get("type") or {},
                group,
                bot.get("status") or {},
                excluded_chat_id,
            ):
                candidates.append(chat_id)
        except driver.DriverError:
            continue
    return min(candidates) if candidates else None


def normalize_group(user, chat_id, sut_id):
    chat = user.client.request({"@type": "getChat", "chat_id": chat_id}, timeout=30)
    chat_type = chat.get("type") or {}
    if chat_type.get("@type") == "chatTypeBasicGroup":
        chat = user.client.request(
            {"@type": "upgradeBasicGroupChatToSupergroupChat", "chat_id": chat_id},
            timeout=30,
        )
        chat_id = chat["id"]
        chat_type = chat["type"]
    supergroup_id = chat_type["supergroup_id"]
    group = user.client.request(
        {"@type": "getSupergroup", "supergroup_id": supergroup_id},
        timeout=30,
    )
    if not group.get("is_forum", False):
        user.client.request(
            {
                "@type": "toggleSupergroupIsForum",
                "supergroup_id": supergroup_id,
                "is_forum": True,
                "has_forum_tabs": True,
            },
            timeout=30,
        )
    user.client.request(
        {
            "@type": "setChatMemberStatus",
            "chat_id": chat_id,
            "member_id": {"@type": "messageSenderUser", "user_id": sut_id},
            "status": {
                "@type": "chatMemberStatusAdministrator",
                "can_be_edited": True,
                "rights": administrator_rights(),
            },
        },
        timeout=30,
    )
    user.client.request(
        {"@type": "setChatTitle", "chat_id": chat_id, "title": "Telly QA"},
        timeout=30,
    )
    user.client.request(
        {
            "@type": "setChatDescription",
            "chat_id": chat_id,
            "description": "Telly reusable Test Server fixture",
        },
        timeout=30,
    )
    user.client.request(
        {
            "@type": "setChatPermissions",
            "chat_id": chat_id,
            "permissions": {
                "@type": "chatPermissions",
                "can_send_basic_messages": True,
                "can_send_audios": True,
                "can_send_documents": True,
                "can_send_photos": True,
                "can_send_videos": True,
                "can_send_video_notes": True,
                "can_send_voice_notes": True,
                "can_send_polls": True,
                "can_send_other_messages": True,
                "can_add_link_previews": True,
                "can_react_to_messages": True,
                "can_edit_tag": True,
                "can_change_info": True,
                "can_invite_users": True,
                "can_pin_messages": True,
                "can_create_topics": True,
            },
        },
        timeout=30,
    )
    topics = user.client.request(
        {
            "@type": "getForumTopics",
            "chat_id": chat_id,
            "query": "",
            "offset_date": 0,
            "offset_message_id": 0,
            "offset_forum_topic_id": 0,
            "limit": 100,
        },
        timeout=30,
    )
    for topic in topics.get("topics") or []:
        info = topic.get("info") or {}
        if info.get("is_general"):
            if info.get("is_closed"):
                user.client.request(
                    {
                        "@type": "toggleForumTopicIsClosed",
                        "chat_id": chat_id,
                        "forum_topic_id": info["forum_topic_id"],
                        "is_closed": False,
                    },
                    timeout=30,
                )
            if info.get("is_hidden"):
                user.client.request(
                    {
                        "@type": "toggleGeneralForumTopicIsHidden",
                        "chat_id": chat_id,
                        "is_hidden": False,
                    },
                    timeout=30,
                )
            if info.get("name") != "General":
                user.client.request(
                    {
                        "@type": "editForumTopic",
                        "chat_id": chat_id,
                        "forum_topic_id": info["forum_topic_id"],
                        "name": "General",
                        "edit_icon_custom_emoji": False,
                        "icon_custom_emoji_id": 0,
                    },
                    timeout=30,
                )
        else:
            user.client.request(
                {
                    "@type": "deleteForumTopic",
                    "chat_id": chat_id,
                    "forum_topic_id": info["forum_topic_id"],
                },
                timeout=30,
            )
    user.client.request({"@type": "unpinAllChatMessages", "chat_id": chat_id}, timeout=30)
    return chat_id


def ensure_group(args):
    config, bot_config, user = authorized_driver()
    sut = driver.resolve_sut(config, bot_config)
    sut_id = int(sut["id"])
    user.resolve_chat(f"@{sut['username']}")
    chat_id = args.chat_id
    if chat_id is not None:
        chat_id = user.resolve_chat(str(chat_id))
        chat = user.client.request({"@type": "getChat", "chat_id": chat_id}, timeout=30)
        group = group_details(user, chat)
        bot = user.client.request(
            {
                "@type": "getChatMember",
                "chat_id": chat_id,
                "member_id": {"@type": "messageSenderUser", "user_id": sut_id},
            },
            timeout=30,
        )
        if group is None or not reusable_fixture(
            chat_id,
            chat.get("type") or {},
            group,
            bot.get("status") or {},
            configured_group_id(config, bot_config),
        ):
            raise driver.DriverError("Explicit reusable group failed safety validation")
    else:
        chat_id = find_reusable_group(user, config, bot_config, sut_id)
    created = chat_id is None
    if created:
        result = user.client.request(
            {
                "@type": "createNewBasicGroupChat",
                "user_ids": [sut_id],
                "title": "Telly QA",
                "message_auto_delete_time": 0,
            },
            timeout=30,
        )
        failed = (result.get("failed_to_add_members") or {}).get("failed_user_ids") or []
        if failed:
            user.client.request(
                {"@type": "deleteChat", "chat_id": result["chat_id"]},
                timeout=30,
            )
            raise driver.DriverError("TDLib could not add the leased bot to the reusable group")
        chat_id = result["chat_id"]
    chat_id = normalize_group(user, chat_id, sut_id)
    print(json.dumps({"ok": True, "chatId": chat_id, "created": created, "isForum": True}))


def find_group(_args):
    config, bot_config, user = authorized_driver()
    sut = driver.resolve_sut(config, bot_config)
    sut_id = int(sut["id"])
    user.resolve_chat(f"@{sut['username']}")
    chat_id = find_reusable_group(user, config, bot_config, sut_id)
    print(json.dumps({"ok": True, "found": chat_id is not None, "chatId": chat_id}))


def reuse_group(_args):
    config, bot_config, user = authorized_driver()
    sut = driver.resolve_sut(config, bot_config)
    sut_id = int(sut["id"])
    user.resolve_chat(f"@{sut['username']}")
    chat_id = find_reusable_group(user, config, bot_config, sut_id)
    if chat_id is None:
        print(json.dumps({"ok": True, "found": False, "chatId": None}))
        return
    chat_id = normalize_group(user, chat_id, sut_id)
    print(json.dumps({"ok": True, "found": True, "chatId": chat_id}))


def normalize_explicit_group(args):
    config, bot_config, user = authorized_driver()
    sut = driver.resolve_sut(config, bot_config)
    sut_id = int(sut["id"])
    chat_id = user.resolve_chat(str(args.chat_id))
    chat = user.client.request({"@type": "getChat", "chat_id": chat_id}, timeout=30)
    group = group_details(user, chat)
    bot = user.client.request(
        {
            "@type": "getChatMember",
            "chat_id": chat_id,
            "member_id": {"@type": "messageSenderUser", "user_id": sut_id},
        },
        timeout=30,
    )
    chat_type = chat.get("type") or {}
    safe = (
        chat_id != configured_group_id(config, bot_config)
        and group is not None
        and (group.get("status") or {}).get("@type") == "chatMemberStatusCreator"
        and (bot.get("status") or {}).get("@type")
        not in {None, "chatMemberStatusLeft", "chatMemberStatusBanned"}
        and not group.get("is_channel", False)
        and chat_type.get("@type") in {"chatTypeBasicGroup", "chatTypeSupergroup"}
    )
    if not safe:
        raise driver.DriverError("Explicit reusable group failed safety validation")
    chat_id = normalize_group(user, chat_id, sut_id)
    print(json.dumps({"ok": True, "chatId": chat_id, "normalized": True}))


def add_bot(args):
    _config, _bot_config, user = authorized_driver()
    user.resolve_chat(f"@{args.username}")
    result = user.client.request(
        {
            "@type": "addChatMember",
            "chat_id": args.chat_id,
            "user_id": args.user_id,
            "forward_limit": 0,
        },
        timeout=30,
    )
    failed = (result.get("failed_to_add_members") or {}).get("failed_user_ids") or []
    if failed:
        raise driver.DriverError("TDLib could not add the temporary bot member")
    print(json.dumps({"ok": True, "added": True}))


def add_channel_bot(args):
    _config, _bot_config, user = authorized_driver()
    user.resolve_chat(f"@{args.username}")
    rights = administrator_rights()
    rights.update(
        {
            "can_post_messages": True,
            "can_edit_messages": True,
            "can_pin_messages": False,
            "can_manage_topics": False,
            "can_manage_direct_messages": True,
            "can_manage_tags": False,
        }
    )
    user.client.request(
        {
            "@type": "setChatMemberStatus",
            "chat_id": args.chat_id,
            "member_id": {"@type": "messageSenderUser", "user_id": args.user_id},
            "status": {
                "@type": "chatMemberStatusAdministrator",
                "can_be_edited": True,
                "rights": rights,
            },
        },
        timeout=30,
    )
    print(json.dumps({"ok": True, "administrator": True}))


def remove_member(args):
    _config, _bot_config, user = authorized_driver()
    user.client.request(
        {
            "@type": "setChatMemberStatus",
            "chat_id": args.chat_id,
            "member_id": {"@type": "messageSenderUser", "user_id": args.user_id},
            "status": {"@type": "chatMemberStatusLeft"},
        },
        timeout=30,
    )
    print(json.dumps({"ok": True, "removed": True}))


def make_member(args):
    _config, _bot_config, user = authorized_driver()
    user.client.request(
        {
            "@type": "setChatMemberStatus",
            "chat_id": args.chat_id,
            "member_id": {"@type": "messageSenderUser", "user_id": args.user_id},
            "status": {"@type": "chatMemberStatusMember", "member_until_date": 0},
        },
        timeout=30,
    )
    print(json.dumps({"ok": True, "member": True}))


def ensure_personal_channel(_args):
    _config, _bot_config, user = authorized_driver()
    tester_id = int(user.client.request({"@type": "getMe"}, timeout=30)["id"])
    full_info = user.client.request(
        {"@type": "getUserFullInfo", "user_id": tester_id},
        timeout=30,
    )
    chat_id = int(full_info.get("personal_chat_id") or 0)
    created = False
    if chat_id == 0:
        suitable = user.client.request({"@type": "getSuitablePersonalChats"}, timeout=30)
        for candidate_id in suitable.get("chat_ids") or []:
            chat = user.client.request(
                {"@type": "getChat", "chat_id": candidate_id},
                timeout=30,
            )
            if chat.get("title") == "Telly QA Channel":
                chat_id = candidate_id
                break
    if chat_id == 0:
        chats = user.client.request(
            {"@type": "getChats", "chat_list": {"@type": "chatListMain"}, "limit": 200},
            timeout=30,
        )
        for candidate_id in chats.get("chat_ids") or []:
            chat = user.client.request(
                {"@type": "getChat", "chat_id": candidate_id},
                timeout=30,
            )
            if chat.get("title") == "Telly QA Channel":
                chat_id = candidate_id
                break
    if chat_id == 0:
        channel = user.client.request(
            {
                "@type": "createNewSupergroupChat",
                "title": "Telly QA Channel",
                "is_forum": False,
                "is_channel": True,
                "description": "Telly reusable Test Server channel fixture",
                "location": None,
                "message_auto_delete_time": 0,
                "for_import": False,
            },
            timeout=30,
        )
        chat_id = channel["id"]
        created = True
    chat = user.client.request({"@type": "getChat", "chat_id": chat_id}, timeout=30)
    supergroup_id = (chat.get("type") or {}).get("supergroup_id")
    if not supergroup_id:
        raise driver.DriverError("Personal-channel fixture is not a channel")
    user.client.request(
        {
            "@type": "setSupergroupUsername",
            "supergroup_id": supergroup_id,
            "username": f"tellyqa{tester_id}",
        },
        timeout=30,
    )
    if int(full_info.get("personal_chat_id") or 0) != chat_id:
        user.client.request({"@type": "setPersonalChat", "chat_id": chat_id}, timeout=30)
    print(json.dumps({"ok": True, "chatId": chat_id, "created": created}))


def send_as_personal_channel(args):
    _config, _bot_config, user = authorized_driver()
    me = user.client.request({"@type": "getMe"}, timeout=30)
    full_info = user.client.request(
        {"@type": "getUserFullInfo", "user_id": me["id"]},
        timeout=30,
    )
    channel_id = int(full_info.get("personal_chat_id") or 0)
    if channel_id == 0:
        raise driver.DriverError("Tester has no personal channel sender fixture")
    senders = user.client.request(
        {"@type": "getChatAvailableMessageSenders", "chat_id": args.chat_id},
        timeout=30,
    )
    sender = next(
        (
            item.get("sender_id")
            for item in senders.get("senders") or []
            if (item.get("sender_id") or {}).get("chat_id") == channel_id
        ),
        None,
    )
    if sender is None:
        raise driver.DriverError("Personal channel is not an available group sender")
    user.client.request(
        {"@type": "setChatMessageSender", "chat_id": args.chat_id, "message_sender_id": sender},
        timeout=30,
    )
    try:
        message = user.send_text(args.chat_id, args.text)
    finally:
        user.client.request(
            {
                "@type": "setChatMessageSender",
                "chat_id": args.chat_id,
                "message_sender_id": {"@type": "messageSenderUser", "user_id": me["id"]},
            },
            timeout=30,
        )
    print(
        json.dumps(
            {
                "ok": True,
                "senderChatId": channel_id,
                "botApiMessageId": message["id"] >> 20,
            }
        )
    )


def post_linked_personal_channel(args):
    _config, _bot_config, user = authorized_driver()
    me = user.client.request({"@type": "getMe"}, timeout=30)
    full_info = user.client.request(
        {"@type": "getUserFullInfo", "user_id": me["id"]},
        timeout=30,
    )
    channel_id = int(full_info.get("personal_chat_id") or 0)
    if channel_id == 0:
        raise driver.DriverError("Tester has no personal channel fixture")
    group = user.client.request({"@type": "getChat", "chat_id": args.chat_id}, timeout=30)
    supergroup_id = (group.get("type") or {}).get("supergroup_id")
    if not supergroup_id:
        raise driver.DriverError("Discussion fixture is not a supergroup")
    group_info = user.client.request(
        {"@type": "getSupergroup", "supergroup_id": supergroup_id},
        timeout=30,
    )
    was_forum = bool(group_info.get("is_forum"))
    if was_forum:
        user.client.request(
            {
                "@type": "toggleSupergroupIsForum",
                "supergroup_id": supergroup_id,
                "is_forum": False,
                "has_forum_tabs": False,
            },
            timeout=30,
        )
    linked = False
    try:
        user.client.request(
            {
                "@type": "toggleSupergroupIsAllHistoryAvailable",
                "supergroup_id": supergroup_id,
                "is_all_history_available": True,
            },
            timeout=30,
        )
        user.client.request(
            {
                "@type": "setChatDiscussionGroup",
                "chat_id": channel_id,
                "discussion_chat_id": args.chat_id,
            },
            timeout=30,
        )
        linked = True
        user.send_text(channel_id, args.text)
        forwarded = find_message_by_text(user, args.chat_id, args.text)
    finally:
        if linked:
            user.client.request(
                {
                    "@type": "setChatDiscussionGroup",
                    "chat_id": channel_id,
                    "discussion_chat_id": 0,
                },
                timeout=30,
            )
        if was_forum:
            user.client.request(
                {
                    "@type": "toggleSupergroupIsForum",
                    "supergroup_id": supergroup_id,
                    "is_forum": True,
                    "has_forum_tabs": True,
                },
                timeout=30,
            )
    print(
        json.dumps(
            {
                "ok": True,
                "senderChatId": channel_id,
                "botApiMessageId": forwarded["id"] >> 20,
            }
        )
    )


def delete_group(args):
    config, _bot_config, user = authorized_driver()
    chat = user.client.request({"@type": "getChat", "chat_id": args.chat_id}, timeout=30)
    chat_type = chat.get("type") or {}
    if chat_type.get("@type") == "chatTypeSupergroup":
        members = user.client.request(
            {
                "@type": "getSupergroupMembers",
                "supergroup_id": chat_type["supergroup_id"],
                "filter": {"@type": "supergroupMembersFilterRecent"},
                "offset": 0,
                "limit": 200,
            },
            timeout=30,
        )
        tester_id = int(config["testerUserId"])
        for member in members.get("members") or []:
            member_id = member.get("member_id") or {}
            user_id = member_id.get("user_id")
            if user_id and int(user_id) != tester_id:
                user.client.request(
                    {
                        "@type": "setChatMemberStatus",
                        "chat_id": args.chat_id,
                        "member_id": member_id,
                        "status": {"@type": "chatMemberStatusLeft"},
                    },
                    timeout=30,
                )
    user.client.request({"@type": "leaveChat", "chat_id": args.chat_id}, timeout=30)
    user.client.request(
        {
            "@type": "deleteChatHistory",
            "chat_id": args.chat_id,
            "remove_from_chat_list": True,
            "revoke": True,
        },
        timeout=30,
    )
    print(json.dumps({"ok": True, "deleted": True}))


def find_message_by_text(user, chat_id, text):
    message = None
    for _attempt in range(50):
        history = user.client.request(
            {
                "@type": "getChatHistory",
                "chat_id": chat_id,
                "from_message_id": 0,
                "offset": 0,
                "limit": 20,
                "only_local": False,
            },
            timeout=30,
        )
        message = next(
            (
                item
                for item in history.get("messages") or []
                if driver.message_content_text(item.get("content") or {}) == text
            ),
            None,
        )
        if message is not None:
            break
        time.sleep(0.1)
    if message is None:
        raise driver.DriverError("Reaction target message did not become visible")
    return message


def find_message(args):
    _config, _bot_config, user = authorized_driver()
    message = find_message_by_text(user, args.chat_id, args.text)
    print(json.dumps({"ok": True, "tdMessageId": message["id"]}))


def send_text(args):
    _config, _bot_config, user = authorized_driver()
    message = user.send_text(args.chat_id, args.text)
    print(
        json.dumps(
            {
                "ok": True,
                "tdMessageId": message["id"],
                "botApiMessageId": message["id"] >> 20,
            }
        )
    )


def add_reaction(args):
    _config, _bot_config, user = authorized_driver()
    message = find_message_by_text(user, args.chat_id, args.text)
    user.client.request(
        {
            "@type": "addMessageReaction",
            "chat_id": args.chat_id,
            "message_id": message["id"],
            "reaction_type": {"@type": "reactionTypeEmoji", "emoji": args.emoji},
            "is_big": False,
            "update_recent_reactions": True,
        },
        timeout=30,
    )
    print(json.dumps({"ok": True, "reacted": True, "tdMessageId": message["id"]}))


def reaction_count(args):
    _config, _bot_config, user = authorized_driver()
    count = None
    for _attempt in range(50):
        reactions = user.client.request(
            {
                "@type": "getMessageAddedReactions",
                "chat_id": args.chat_id,
                "message_id": args.td_message_id,
                "reaction_type": None,
                "offset": "",
                "limit": 100,
            },
            timeout=30,
        )
        count = reactions.get("total_count") or 0
        if args.expect is None or count == args.expect:
            break
        time.sleep(0.1)
    print(json.dumps({"ok": True, "reactionCount": count}))


def main():
    parser = argparse.ArgumentParser(description="Own an isolated Telegram Test Server group fixture.")
    subparsers = parser.add_subparsers(required=True)
    ensure = subparsers.add_parser("ensure")
    ensure.add_argument("--chat-id", type=int)
    ensure.set_defaults(run=ensure_group)
    find = subparsers.add_parser("find")
    find.set_defaults(run=find_group)
    reuse = subparsers.add_parser("reuse")
    reuse.set_defaults(run=reuse_group)
    normalize = subparsers.add_parser("normalize")
    normalize.add_argument("--chat-id", required=True, type=int)
    normalize.set_defaults(run=normalize_explicit_group)
    add = subparsers.add_parser("add-bot")
    add.add_argument("--chat-id", required=True, type=int)
    add.add_argument("--user-id", required=True, type=int)
    add.add_argument("--username", required=True)
    add.set_defaults(run=add_bot)
    channel_bot = subparsers.add_parser("add-channel-bot")
    channel_bot.add_argument("--chat-id", required=True, type=int)
    channel_bot.add_argument("--user-id", required=True, type=int)
    channel_bot.add_argument("--username", required=True)
    channel_bot.set_defaults(run=add_channel_bot)
    remove = subparsers.add_parser("remove-member")
    remove.add_argument("--chat-id", required=True, type=int)
    remove.add_argument("--user-id", required=True, type=int)
    remove.set_defaults(run=remove_member)
    member = subparsers.add_parser("make-member")
    member.add_argument("--chat-id", required=True, type=int)
    member.add_argument("--user-id", required=True, type=int)
    member.set_defaults(run=make_member)
    personal = subparsers.add_parser("ensure-personal-channel")
    personal.set_defaults(run=ensure_personal_channel)
    sender = subparsers.add_parser("send-as-personal-channel")
    sender.add_argument("--chat-id", required=True, type=int)
    sender.add_argument("--text", required=True)
    sender.set_defaults(run=send_as_personal_channel)
    linked = subparsers.add_parser("post-linked-personal-channel")
    linked.add_argument("--chat-id", required=True, type=int)
    linked.add_argument("--text", required=True)
    linked.set_defaults(run=post_linked_personal_channel)
    delete = subparsers.add_parser("delete")
    delete.add_argument("--chat-id", required=True, type=int)
    delete.set_defaults(run=delete_group)
    react = subparsers.add_parser("react")
    react.add_argument("--chat-id", required=True, type=int)
    react.add_argument("--text", required=True)
    react.add_argument("--emoji", default="👍")
    react.set_defaults(run=add_reaction)
    message = subparsers.add_parser("find-message")
    message.add_argument("--chat-id", required=True, type=int)
    message.add_argument("--text", required=True)
    message.set_defaults(run=find_message)
    send = subparsers.add_parser("send-text")
    send.add_argument("--chat-id", required=True, type=int)
    send.add_argument("--text", required=True)
    send.set_defaults(run=send_text)
    reactions = subparsers.add_parser("reaction-count")
    reactions.add_argument("--chat-id", required=True, type=int)
    reactions.add_argument("--td-message-id", required=True, type=int)
    reactions.add_argument("--expect", type=int)
    reactions.set_defaults(run=reaction_count)
    args = parser.parse_args()
    args.run(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
