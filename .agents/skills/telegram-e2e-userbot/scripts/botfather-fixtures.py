#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# ///

import argparse
import importlib.util
import json
import re
import sys
import time
from pathlib import Path


DRIVER_PATH = Path(__file__).with_name("user-driver.py")
_spec = importlib.util.spec_from_file_location("tg_user_driver", DRIVER_PATH)
driver = importlib.util.module_from_spec(_spec)
sys.modules["tg_user_driver"] = driver
_spec.loader.exec_module(driver)


def wait_for_reply(user, chat_id, after_message_id):
    deadline = time.time() + 30
    while time.time() < deadline:
        update = user.client.next_update(timeout=0.5)
        if not update or update.get("@type") != "updateNewMessage":
            continue
        message = update.get("message") or {}
        if (
            message.get("chat_id") == chat_id
            and message.get("id", 0) > after_message_id
            and not message.get("is_outgoing", False)
        ):
            return message
    raise driver.DriverError("BotFather did not reply within 30 seconds")


def send_step(user, chat_id, text):
    sent = user.send_text(chat_id, text)
    return wait_for_reply(user, chat_id, sent["id"])


def click_callback_containing(user, chat_id, message, text):
    markup = message.get("reply_markup") or {}
    for row in markup.get("rows") or []:
        for button in row:
            button_type = button.get("type") or {}
            if (
                text.lower() in button.get("text", "").lower()
                and button_type.get("@type") == "inlineKeyboardButtonTypeCallback"
            ):
                user.client.request(
                    {
                        "@type": "getCallbackQueryAnswer",
                        "chat_id": chat_id,
                        "message_id": message["id"],
                        "payload": {
                            "@type": "callbackQueryPayloadData",
                            "data": button_type["data"],
                        },
                    },
                    timeout=30,
                )
                return True
    return False


def click_first_callback(user, chat_id, message):
    markup = message.get("reply_markup") or {}
    for row in markup.get("rows") or []:
        for button in row:
            button_type = button.get("type") or {}
            if button_type.get("@type") == "inlineKeyboardButtonTypeCallback":
                user.client.request(
                    {
                        "@type": "getCallbackQueryAnswer",
                        "chat_id": chat_id,
                        "message_id": message["id"],
                        "payload": {
                            "@type": "callbackQueryPayloadData",
                            "data": button_type["data"],
                        },
                    },
                    timeout=30,
                )
                return True
    return False


def refresh_message(user, chat_id, message):
    return user.client.request(
        {"@type": "getMessage", "chat_id": chat_id, "message_id": message["id"]},
        timeout=30,
    )


def button_shapes(message):
    return [
        {
            "text": button.get("text", ""),
            "type": (button.get("type") or {}).get("@type", ""),
        }
        for row in (message.get("reply_markup") or {}).get("rows") or []
        for button in row
    ]


def button_text_containing(message, text):
    return next(
        (
            button["text"]
            for button in button_shapes(message)
            if text.lower() in button["text"].lower()
            and button["type"] == "keyboardButtonTypeText"
        ),
        None,
    )


def enable_inline(_args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    sut = driver.resolve_sut(config, bot_config)
    chat_id = user.resolve_chat("@BotFather")
    send_step(user, chat_id, "/cancel")
    send_step(user, chat_id, "/setinline")
    send_step(user, chat_id, f"@{sut['username']}")
    send_step(user, chat_id, "Search with Telly")
    print(json.dumps({"ok": True, "inlineRequested": True}))


def run_inline_query(args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    sut = driver.resolve_sut(config, bot_config)
    chat_id = user.resolve_chat(f"@{sut['username']}")
    result = user.client.request(
        {
            "@type": "getInlineQueryResults",
            "bot_user_id": int(sut["id"]),
            "chat_id": chat_id,
            "query": args.query,
            "offset": "",
        },
        timeout=30,
    )
    print(json.dumps({"ok": True, "resultCount": len(result.get("results") or [])}))


def create_game(args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    sut = driver.resolve_sut(config, bot_config)
    chat_id = user.resolve_chat("@BotFather")
    def step(text):
        return send_step(user, chat_id, text)

    step("/cancel")
    introduction = send_step(user, chat_id, "/newgame")
    introduction_text = driver.message_content_text(introduction.get("content") or {})
    if "Serving specific pages" in introduction_text:
        introduction = refresh_message(user, chat_id, introduction)
        ok_text = button_text_containing(introduction, "OK")
        if ok_text is not None:
            rules = send_step(user, chat_id, ok_text)
        elif click_first_callback(user, chat_id, introduction):
            rules = wait_for_reply(user, chat_id, introduction["id"])
        else:
            raise driver.DriverError(
                f"BotFather game introduction controls: {button_shapes(introduction)}"
            )
        rules = refresh_message(user, chat_id, rules)
        agree_text = button_text_containing(rules, "accept") or button_text_containing(
            rules, "agree"
        )
        if agree_text is not None:
            prompt = send_step(user, chat_id, agree_text)
        elif click_callback_containing(user, chat_id, rules, "accept") or click_callback_containing(
            user, chat_id, rules, "agree"
        ):
            prompt = wait_for_reply(user, chat_id, rules["id"])
        else:
            raise driver.DriverError(
                f"BotFather game rules controls: {button_shapes(rules)}"
            )
    step(f"@{sut['username']}")
    step("Telly Proof")
    step("Telly Test Server game")
    sent = user.send_photos(chat_id, [args.photo], "")[0]
    wait_for_reply(user, chat_id, sent["id"])
    step("/empty")
    reply = send_step(user, chat_id, args.short_name)
    response = driver.message_content_text(reply.get("content") or {})
    if "short_name" not in response:
        raise driver.DriverError("BotFather did not confirm the game short name")
    print(json.dumps({"ok": True, "gameCreated": True}))


def find_game(args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    sut = driver.resolve_sut(config, bot_config)
    chat_id = user.resolve_chat(f"@{sut['username']}")
    found = None
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
        found = next(
            (
                message
                for message in history.get("messages") or []
                if (message.get("content") or {}).get("@type") == "messageGame"
                and (((message.get("content") or {}).get("game") or {}).get("short_name"))
                == args.short_name
            ),
            None,
        )
        if found is not None:
            break
        time.sleep(0.1)
    if found is None:
        raise driver.DriverError("Game message did not become visible")
    print(json.dumps({"ok": True, "contentType": "messageGame"}))


def create_bot(args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    chat_id = user.resolve_chat("@BotFather")
    send_step(user, chat_id, "/cancel")
    name_prompt = send_step(user, chat_id, "/newbot")
    name_prompt_text = driver.message_content_text(name_prompt.get("content") or {})
    if "name" not in name_prompt_text.lower():
        raise driver.DriverError(f"BotFather did not request a bot name: {name_prompt_text!r}")
    username_prompt = send_step(user, chat_id, "Telly Disposable")
    username_prompt_text = driver.message_content_text(username_prompt.get("content") or {})
    if "username" not in username_prompt_text.lower():
        raise driver.DriverError(
            f"BotFather did not request a bot username: {username_prompt_text!r}"
        )
    reply = send_step(user, chat_id, args.username)
    text = driver.message_content_text(reply.get("content") or {})
    token = re.search(r"\b\d+:[A-Za-z0-9_-]+\b", text)
    if token is None:
        raise driver.DriverError(
            f"BotFather did not return a disposable bot token: {text!r}"
        )
    print(json.dumps({"ok": True, "token": token.group(0)}))


def delete_bot(args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    chat_id = user.resolve_chat("@BotFather")
    send_step(user, chat_id, "/cancel")
    send_step(user, chat_id, "/deletebot")
    prompt = send_step(user, chat_id, f"@{args.username}")
    prompt = refresh_message(user, chat_id, prompt)
    confirmation = button_text_containing(prompt, "sure") or "Yes, I am totally sure."
    reply = send_step(user, chat_id, confirmation)
    text = driver.message_content_text(reply.get("content") or {}).lower()
    if "deleted" not in text and "bot is gone" not in text:
        raise driver.DriverError(
            f"BotFather did not confirm disposable bot deletion: {text!r}"
        )
    print(json.dumps({"ok": True, "deleted": True}))


def write_main_web_app(args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    chat_id = user.resolve_chat("@BotFather")
    chat = user.client.request({"@type": "getChat", "chat_id": chat_id}, timeout=30)
    bot_user_id = int((chat.get("type") or {}).get("user_id") or 0)
    if bot_user_id == 0:
        raise driver.DriverError("BotFather chat did not resolve to a bot user")
    result = user.client.request(
        {
            "@type": "getMainWebApp",
            "chat_id": chat_id,
            "bot_user_id": bot_user_id,
            "start_parameter": "",
            "parameters": {
                "@type": "webAppOpenParameters",
                "theme": None,
                "application_name": "Telly",
                "mode": {"@type": "webAppOpenModeFullSize"},
            },
        },
        timeout=30,
    )
    url_value = result.get("url") or {}
    url = url_value.get("url") if isinstance(url_value, dict) else ""
    if not isinstance(url, str) or not url.startswith("https://"):
        raise driver.DriverError("BotFather did not return its main Web App URL")
    driver.write_json_private(Path(args.output), {"url": url})
    print(json.dumps({"ok": True, "urlWritten": True}))


def main():
    parser = argparse.ArgumentParser(description="Provision BotFather-owned Test Server fixtures.")
    subparsers = parser.add_subparsers(required=True)
    inline = subparsers.add_parser("enable-inline")
    inline.set_defaults(run=enable_inline)
    query = subparsers.add_parser("inline-query")
    query.add_argument("--query", required=True)
    query.set_defaults(run=run_inline_query)
    game = subparsers.add_parser("create-game")
    game.add_argument("--short-name", required=True)
    game.add_argument("--photo", required=True)
    game.set_defaults(run=create_game)
    game_message = subparsers.add_parser("find-game")
    game_message.add_argument("--short-name", required=True)
    game_message.set_defaults(run=find_game)
    bot = subparsers.add_parser("create-bot")
    bot.add_argument("--username", required=True)
    bot.set_defaults(run=create_bot)
    delete = subparsers.add_parser("delete-bot")
    delete.add_argument("--username", required=True)
    delete.set_defaults(run=delete_bot)
    web_app = subparsers.add_parser("write-main-web-app")
    web_app.add_argument("--output", required=True)
    web_app.set_defaults(run=write_main_web_app)
    args = parser.parse_args()
    args.run(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
