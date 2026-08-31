#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# ///

import argparse
import importlib.util
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path


DRIVER_PATH = Path(__file__).with_name("user-driver.py")
_spec = importlib.util.spec_from_file_location("tg_user_driver", DRIVER_PATH)
driver = importlib.util.module_from_spec(_spec)
sys.modules["tg_user_driver"] = driver
_spec.loader.exec_module(driver)


def find_invoice(user, chat_id, title):
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
        invoice = next(
            (
                message
                for message in history.get("messages") or []
                if (message.get("content") or {}).get("@type") == "messageInvoice"
                and ((((message.get("content") or {}).get("product_info") or {}).get("title")))
                == title
            ),
            None,
        )
        if invoice is not None:
            return invoice
        time.sleep(0.1)
    raise driver.DriverError("Invoice message did not become visible")


def pay_invoice(args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    sut = driver.resolve_sut(config, bot_config)
    chat_id = user.resolve_chat(f"@{sut['username']}")
    invoice = find_invoice(user, chat_id, args.title)
    input_invoice = {
        "@type": "inputInvoiceMessage",
        "chat_id": chat_id,
        "message_id": invoice["id"],
    }
    form = user.client.request(
        {"@type": "getPaymentForm", "input_invoice": input_invoice, "theme": None},
        timeout=30,
    )
    if (form.get("type") or {}).get("@type") != "paymentFormTypeStars":
        raise driver.DriverError("Invoice did not produce a Telegram Stars payment form")
    result = user.client.request(
        {
            "@type": "sendPaymentForm",
            "input_invoice": input_invoice,
            "payment_form_id": form["id"],
            "order_info_id": "",
            "shipping_option_id": "",
            "credentials": None,
            "tip_amount": 0,
        },
        timeout=60,
    )
    print(
        json.dumps(
            {
                "ok": True,
                "success": bool(result.get("success")),
                "hasVerificationUrl": bool(result.get("verification_url")),
            }
        )
    )


def inspect_star_purchase(_args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    options = user.client.request({"@type": "getStarPaymentOptions"}, timeout=30)
    available = options.get("options") or []
    if not available:
        raise driver.DriverError("Telegram returned no Star purchase options")
    option = min(available, key=lambda item: int(item.get("star_count") or 0))
    input_invoice = {
        "@type": "inputInvoiceTelegram",
        "purpose": {
            "@type": "telegramPaymentPurposeStars",
            "currency": option["currency"],
            "amount": option["amount"],
            "star_count": option["star_count"],
            "chat_id": 0,
        },
    }
    form = user.client.request(
        {"@type": "getPaymentForm", "input_invoice": input_invoice, "theme": None},
        timeout=30,
    )
    form_type = form.get("type") or {}
    provider = form_type.get("payment_provider") or {}
    print(
        json.dumps(
            {
                "ok": True,
                "currency": option["currency"],
                "starCount": option["star_count"],
                "formType": form_type.get("@type"),
                "providerType": provider.get("@type"),
            }
        )
    )


def buy_stars(_args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    me = user.client.request({"@type": "getMe"}, timeout=30)
    options = user.client.request({"@type": "getStarPaymentOptions"}, timeout=30)
    available = options.get("options") or []
    if not available:
        raise driver.DriverError("Telegram returned no Star purchase options")
    option = min(available, key=lambda item: int(item.get("star_count") or 0))
    input_invoice = {
        "@type": "inputInvoiceTelegram",
        "purpose": {
            "@type": "telegramPaymentPurposeStars",
            "currency": option["currency"],
            "amount": option["amount"],
            "star_count": option["star_count"],
            "chat_id": 0,
        },
    }
    form = user.client.request(
        {"@type": "getPaymentForm", "input_invoice": input_invoice, "theme": None},
        timeout=30,
    )
    form_type = form.get("type") or {}
    provider = form_type.get("payment_provider") or {}
    if provider.get("@type") != "paymentProviderStripe":
        raise driver.DriverError("Star purchase did not use the Test Server Stripe provider")
    card = urllib.parse.urlencode(
        {
            "card[number]": "4242424242424242",
            "card[exp_month]": "12",
            "card[exp_year]": "2035",
            "card[cvc]": "123",
            "card[name]": "Telly Test",
            "card[address_country]": "IN",
            "card[address_zip]": "110001",
        }
    ).encode()
    request = urllib.request.Request(
        "https://api.stripe.com/v1/tokens",
        data=card,
        headers={
            "Authorization": f"Bearer {provider['publishable_key']}",
            "Content-Type": "application/x-www-form-urlencoded",
            "Stripe-Version": "2015-10-12",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            token = json.loads(response.read().decode())
    except (OSError, ValueError) as error:
        raise driver.DriverError("Stripe Test Server tokenization failed") from error
    token_id = token.get("id")
    if not isinstance(token_id, str) or not token_id.startswith("tok_"):
        raise driver.DriverError("Stripe Test Server returned no card token")
    result = user.client.request(
        {
            "@type": "sendPaymentForm",
            "input_invoice": input_invoice,
            "payment_form_id": form["id"],
            "order_info_id": "",
            "shipping_option_id": "",
            "credentials": {
                "@type": "inputCredentialsNew",
                "data": json.dumps({"type": "card", "id": token_id}),
                "allow_save": False,
            },
            "tip_amount": 0,
        },
        timeout=60,
    )
    transactions = user.client.request(
        {
            "@type": "getStarTransactions",
            "owner_id": {"@type": "messageSenderUser", "user_id": me["id"]},
            "subscription_id": "",
            "direction": None,
            "offset": "",
            "limit": 1,
        },
        timeout=30,
    )
    amount = int((transactions.get("star_amount") or {}).get("star_count") or 0)
    print(
        json.dumps(
            {
                "ok": True,
                "success": bool(result.get("success")),
                "starBalance": amount,
            }
        )
    )


def star_balance(_args):
    config, bot_config = driver.load_config()
    user = driver.UserDriver(config, bot_config)
    user.authorize(need_ready=True)
    me = user.client.request({"@type": "getMe"}, timeout=30)
    transactions = user.client.request(
        {
            "@type": "getStarTransactions",
            "owner_id": {"@type": "messageSenderUser", "user_id": me["id"]},
            "subscription_id": "",
            "direction": None,
            "offset": "",
            "limit": 1,
        },
        timeout=30,
    )
    amount = int((transactions.get("star_amount") or {}).get("star_count") or 0)
    print(json.dumps({"ok": True, "starBalance": amount}))


def main():
    parser = argparse.ArgumentParser(description="Drive Telegram Test Server payment fixtures.")
    subparsers = parser.add_subparsers(required=True)
    pay = subparsers.add_parser("pay-invoice")
    pay.add_argument("--title", required=True)
    pay.set_defaults(run=pay_invoice)
    inspect = subparsers.add_parser("inspect-star-purchase")
    inspect.set_defaults(run=inspect_star_purchase)
    buy = subparsers.add_parser("buy-stars")
    buy.set_defaults(run=buy_stars)
    balance = subparsers.add_parser("star-balance")
    balance.set_defaults(run=star_balance)
    args = parser.parse_args()
    args.run(args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
