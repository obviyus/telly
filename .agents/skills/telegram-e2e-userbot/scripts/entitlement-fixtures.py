#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# ///

import argparse
import importlib.util
import json
import sys
from pathlib import Path


DRIVER_PATH = Path(__file__).with_name("user-driver.py")
_spec = importlib.util.spec_from_file_location("tg_user_driver", DRIVER_PATH)
driver = importlib.util.module_from_spec(_spec)
sys.modules["tg_user_driver"] = driver
_spec.loader.exec_module(driver)


def authorized_driver():
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    return config, bot_config, user


def business_bot(bot_user_id):
    return {
        "@type": "businessConnectedBot",
        "bot_user_id": bot_user_id,
        "recipients": {
            "@type": "businessRecipients",
            "chat_ids": [],
            "excluded_chat_ids": [],
            "select_existing_chats": True,
            "select_new_chats": True,
            "select_contacts": True,
            "select_non_contacts": True,
            "exclude_selected": False,
        },
        "rights": {
            "@type": "businessBotRights",
            "can_reply": True,
            "can_read_messages": True,
            "can_delete_sent_messages": True,
            "can_delete_all_messages": True,
            "can_edit_name": True,
            "can_edit_bio": True,
            "can_edit_profile_photo": True,
            "can_edit_username": True,
            "can_view_gifts_and_stars": True,
            "can_sell_gifts": True,
            "can_change_gift_settings": True,
            "can_transfer_and_upgrade_gifts": True,
            "can_transfer_stars": True,
            "can_manage_stories": True,
        },
    }


def connect_business(_args):
    config, bot_config, user = authorized_driver()
    sut = driver.resolve_sut(config, bot_config)
    bot_chat_id = user.resolve_chat(f"@{sut['username']}")
    bot_chat = user.client.request({"@type": "getChat", "chat_id": bot_chat_id}, timeout=30)
    bot_user_id = int((bot_chat.get("type") or {}).get("user_id") or 0)
    if bot_user_id != int(sut["id"]):
        raise driver.DriverError("Resolved business bot identity does not match the lease")
    try:
        connected = user.client.request({"@type": "getBusinessConnectedBot"}, timeout=30)
        connected_id = int(((connected.get("bot") or {}).get("bot_user_id")) or 0)
        if connected_id == bot_user_id:
            user.client.request(
                {"@type": "deleteBusinessConnectedBot", "bot_user_id": bot_user_id},
                timeout=30,
            )
    except driver.DriverError as error:
        if "failed (404)" not in str(error):
            raise
    user.client.request(
        {"@type": "setBusinessConnectedBot", "bot": business_bot(bot_user_id)},
        timeout=30,
    )
    connected = user.client.request({"@type": "getBusinessConnectedBot"}, timeout=30)
    connected_bot = connected.get("bot") or {}
    if int(connected_bot.get("bot_user_id") or 0) != bot_user_id:
        raise driver.DriverError("Telegram connected a different business bot")
    if int(connected.get("connection_date") or 0) == 0:
        user.client.request(
            {"@type": "confirmBusinessConnectedBot", "bot_user_id": bot_user_id},
            timeout=30,
        )
        connected = user.client.request({"@type": "getBusinessConnectedBot"}, timeout=30)
    print(
        json.dumps(
            {
                "ok": True,
                "connected": True,
                "confirmed": int(connected.get("connection_date") or 0) > 0,
            }
        )
    )


def business_account_state(args):
    _config, _bot_config, user = authorized_driver()
    me = user.client.request({"@type": "getMe"}, timeout=30)
    full = user.client.request({"@type": "getUserFullInfo", "user_id": me["id"]}, timeout=30)
    settings = full.get("gift_settings") or {}
    accepted = settings.get("accepted_gift_types") or {}
    state = {
        "firstName": me.get("first_name") or "",
        "lastName": me.get("last_name") or "",
        "username": (me.get("usernames") or {}).get("editable_username") or "",
        "bio": ((full.get("bio") or {}).get("text")) or "",
        "showGiftButton": bool(settings.get("show_gift_button")),
        "acceptedGiftTypes": {
            "unlimitedGifts": bool(accepted.get("unlimited_gifts")),
            "limitedGifts": bool(accepted.get("limited_gifts")),
            "uniqueGifts": bool(accepted.get("upgraded_gifts")),
            "premiumSubscription": bool(accepted.get("premium_subscription")),
            "giftsFromChannels": bool(accepted.get("gifts_from_channels")),
        },
    }
    driver.write_json_private(Path(args.output), state)
    print(json.dumps({"ok": True, "stateWritten": True}))


def ensure_managed_bot(_args):
    config, bot_config, user = authorized_driver()
    sut = driver.resolve_sut(config, bot_config)
    manager_chat_id = user.resolve_chat(f"@{sut['username']}")
    manager_chat = user.client.request(
        {"@type": "getChat", "chat_id": manager_chat_id}, timeout=30
    )
    manager_bot_id = int((manager_chat.get("type") or {}).get("user_id") or 0)
    manager = user.client.request({"@type": "getUser", "user_id": manager_bot_id}, timeout=30)
    if not bool((manager.get("type") or {}).get("can_manage_bots")):
        raise driver.DriverError("BotFather did not enable Bot Management Mode")
    username = f"tellym{str(manager_bot_id)[-10:]}proofbot"
    created = False
    try:
        managed_chat_id = user.resolve_chat(f"@{username}")
        managed_chat = user.client.request(
            {"@type": "getChat", "chat_id": managed_chat_id}, timeout=30
        )
        managed_bot_id = int((managed_chat.get("type") or {}).get("user_id") or 0)
    except driver.DriverError as error:
        if "USERNAME_NOT_OCCUPIED" not in str(error):
            raise
        managed = user.client.request(
            {
                "@type": "createBot",
                "manager_bot_user_id": manager_bot_id,
                "name": "Telly Managed Proof",
                "username": username,
                "via_link": True,
            },
            timeout=60,
        )
        managed_bot_id = int(managed.get("id") or 0)
        created = True
    if managed_bot_id == 0:
        raise driver.DriverError("Telegram returned no managed bot identity")
    full = user.client.request(
        {"@type": "getUserFullInfo", "user_id": managed_bot_id}, timeout=30
    )
    actual_manager = int(((full.get("bot_info") or {}).get("manager_bot_user_id")) or 0)
    if actual_manager != manager_bot_id:
        raise driver.DriverError("Managed bot belongs to a different manager")
    print(json.dumps({"ok": True, "botUserId": managed_bot_id, "created": created}))


def passport_state(_args):
    _config, _bot_config, user = authorized_driver()
    state = user.client.request({"@type": "getPasswordState"}, timeout=30)
    print(
        json.dumps(
            {
                "ok": True,
                "hasPassword": bool(state.get("has_password")),
                "hasPassportData": bool(state.get("has_passport_data")),
            }
        )
    )


def main():
    parser = argparse.ArgumentParser(description="Provision reusable Test Server entitlements.")
    subparsers = parser.add_subparsers(required=True)
    business = subparsers.add_parser("connect-business")
    business.set_defaults(run=connect_business)
    state = subparsers.add_parser("business-account-state")
    state.add_argument("--output", required=True)
    state.set_defaults(run=business_account_state)
    managed = subparsers.add_parser("ensure-managed-bot")
    managed.set_defaults(run=ensure_managed_bot)
    passport = subparsers.add_parser("passport-state")
    passport.set_defaults(run=passport_state)
    args = parser.parse_args()
    args.run(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
