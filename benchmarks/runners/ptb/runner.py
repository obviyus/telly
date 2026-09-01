import argparse
import asyncio
import json
import os
import platform
import time
from pathlib import Path

import telegram
from telegram import Update
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ExtBot,
    MessageHandler,
    filters,
)
from telegram.request import BaseRequest


WEIGHTS = {"callback": 3, "command": 2, "text": 1}


class BenchmarkRequest(BaseRequest):
    @property
    def read_timeout(self):
        return None

    async def initialize(self):
        return None

    async def shutdown(self):
        return None

    async def do_request(self, url, method, request_data=None, **kwargs):
        body = {
            "ok": True,
            "result": {
                "first_name": "Benchmark",
                "id": 123456,
                "is_bot": True,
                "username": "benchmark_bot",
            },
        }
        return 200, json.dumps(body).encode()


def arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode")
    parser.add_argument("--operations", type=int, default=1)
    parser.add_argument("--rounds", type=int, default=1)
    parser.add_argument("--startup", default="false")
    parser.add_argument("--warmups", type=int, default=0)
    parser.add_argument("--workload")
    return parser.parse_args()


def make_metrics():
    return {"callback": 0, "checksum": 0, "command": 0, "text": 0}


def fold_checksum(current, kind, payload, update_id):
    product = (update_id * 17) & 0xFFFFFFFF
    return (current + product + len(payload) * 31 + WEIGHTS[kind]) & 0xFFFFFFFF


def record(metrics, kind, payload, update_id):
    metrics[kind] += 1
    metrics["checksum"] = fold_checksum(metrics["checksum"], kind, payload, update_id)


def expected(entries, operations):
    metrics = make_metrics()
    for index in range(operations):
        entry = entries[index % len(entries)]
        record(metrics, entry["kind"], entry["payload"], entry["updateId"])
    return metrics


def final_rss_bytes():
    try:
        pages = int(Path("/proc/self/statm").read_text().split()[1])
        return pages * os.sysconf("SC_PAGE_SIZE")
    except (OSError, ValueError, IndexError):
        return 0


def max_rss_kib():
    status = Path("/proc/self/status").read_text()
    for line in status.splitlines():
        if line.startswith("VmHWM:"):
            return int(line.split()[1])
    raise RuntimeError("Linux VmHWM is unavailable")


async def main():
    args = arguments()
    request = BenchmarkRequest()
    bot = ExtBot(
        "123456:ptb-benchmark",
        request=request,
        get_updates_request=request,
    )
    application = Application.builder().bot(bot).build()
    current = make_metrics()
    sentinel = 0

    async def command_handler(update, context):
        payload = " ".join(context.args)
        record(current, "command", payload, update.update_id)

    async def text_handler(update, context):
        nonlocal sentinel
        payload = update.message.text
        if payload == "__await__":
            await asyncio.sleep(0)
            sentinel += 1
            return
        record(current, "text", payload, update.update_id)

    async def callback_handler(update, context):
        record(current, "callback", update.callback_query.data, update.update_id)

    application.add_handler(CommandHandler("bench", command_handler))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, text_handler))
    application.add_handler(CallbackQueryHandler(callback_handler))

    if args.startup == "true":
        print(json.dumps({
            "framework": "python-telegram-bot",
            "ready": True,
            "runtime": f"python {platform.python_version()}",
            "schemaVersion": 1,
            "version": telegram.__version__,
        }, separators=(",", ":")))
        return

    if args.operations < 1 or args.rounds < 1 or args.warmups < 0:
        raise ValueError("operations and rounds must be positive; warmups must be non-negative")
    if args.workload is None:
        raise ValueError("missing workload path")
    source = Path(args.workload).read_text()
    entries = json.loads(source)["entries"]
    await application.initialize()

    async def dispatch_ingress(entry):
        await application.process_update(Update.de_json(entry["update"], bot))

    async def dispatch_routing(entry):
        await application.process_update(entry["native"])

    async def decode_entry(entry):
        update = Update.de_json(entry["update"], bot)
        if update.callback_query is not None:
            record(current, "callback", update.callback_query.data or "", update.update_id)
            return
        payload = update.message.text or ""
        is_command = bool(update.message.entities and update.message.entities[0].type == "bot_command")
        record(current, "command" if is_command else "text", payload[7:] if is_command else payload, update.update_id)

    for kind in ("text", "command", "callback"):
        entry = next(value for value in entries if value["kind"] == kind)
        await dispatch_ingress(entry)
    await dispatch_ingress({
        "update": {
            "message": {
                "chat": {"id": 71, "type": "private"},
                "date": 1_700_000_000,
                "from": {"first_name": "Benchmark", "id": 17, "is_bot": False},
                "message_id": 1,
                "text": "__await__",
            },
            "update_id": 1,
        },
    })
    await application.process_update(Update.de_json({"update_id": 2}, bot))
    if (
        current["text"] != 1
        or current["command"] != 1
        or current["callback"] != 1
        or sentinel != 1
    ):
        raise RuntimeError("python-telegram-bot routing preflight failed")

    prepared = entries
    dispatch = dispatch_ingress
    if args.mode == "routing":
        prepared = [
            {**entry, "native": Update.de_json(entry["update"], bot)}
            for entry in entries
        ]
        dispatch = dispatch_routing
    elif args.mode == "decode":
        dispatch = decode_entry

    async def run_round(measure_latency):
        nonlocal current
        current = make_metrics()
        latency_ns = [0] * args.operations if measure_latency else None
        started = time.perf_counter_ns()
        for index in range(args.operations):
            operation_started = time.perf_counter_ns() if measure_latency else None
            await dispatch(prepared[index % len(prepared)])
            if latency_ns is not None:
                latency_ns[index] = time.perf_counter_ns() - operation_started
        duration_ns = time.perf_counter_ns() - started
        wanted = expected(entries, args.operations)
        if current != wanted:
            raise RuntimeError(f"correctness failure: expected {wanted}, received {current}")
        return {
            "latency": latency_ns,
            "round": {
                "checksum": current["checksum"],
                "counts": {
                    "callback": current["callback"],
                    "command": current["command"],
                    "text": current["text"],
                },
                "durationNs": duration_ns,
                "operations": args.operations,
            },
        }

    if args.mode == "floor":
        latency_ns = [0] * args.operations
        for index in range(args.operations):
            started = time.perf_counter_ns()
            latency_ns[index] = time.perf_counter_ns() - started
        rounds = []
    else:
        for _ in range(args.warmups):
            await run_round(False)
        if args.mode == "latency":
            measured = await run_round(True)
            rounds = [measured["round"]]
            latency_ns = measured["latency"]
        else:
            rounds = [(await run_round(False))["round"] for _ in range(args.rounds)]
            latency_ns = None

    result = {
        "finalRssBytes": final_rss_bytes(),
        "framework": "python-telegram-bot",
        "maxRssKiB": max_rss_kib(),
        "mode": args.mode,
        "rounds": rounds,
        "runtime": f"python {platform.python_version()}",
        "schemaVersion": 1,
        "version": telegram.__version__,
    }
    if latency_ns is not None:
        result["latencyNs"] = latency_ns
    print(json.dumps(result, separators=(",", ":")))
    await application.shutdown()


asyncio.run(main())
