import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path


RECORD_PATH = Path(__file__).with_name("user-record.py")
SPEC = importlib.util.spec_from_file_location("tg_user_record", RECORD_PATH)
record = importlib.util.module_from_spec(SPEC)
sys.modules["tg_user_record"] = record
SPEC.loader.exec_module(record)


class FakeClient:
    def __init__(self):
        self.requests = []

    def request(self, payload, timeout=20):
        self.requests.append((payload, timeout))
        return {"@type": "callbackQueryAnswer", "text": ""}


class CallbackScenarioTest(unittest.TestCase):
    def test_waits_for_prior_gateway_barriers(self):
        actions = [
            {"type": "patchConfig", "atMs": 0},
            {"type": "send", "atMs": 0, "text": "after patch"},
        ]
        with tempfile.TemporaryDirectory() as directory:
            self.assertFalse(record.scenario_barriers_ready(actions, 1, directory))
            (Path(directory) / "0").touch()
            self.assertTrue(record.scenario_barriers_ready(actions, 1, directory))

    def test_publishes_atomic_recorder_ready_artifact(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.started_at = 1_786_900_000.125
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "ready.json"
            record.publish_recorder_ready(target, recorder)
            self.assertEqual(
                json.loads(target.read_text()),
                {
                    "schemaVersion": 1,
                    "startedAtUnixMs": 1_786_900_000_125,
                    "chatId": -1001,
                },
            )
            self.assertEqual(list(target.parent.glob(".*.tmp")), [])

    def test_ignores_cached_messages_from_before_recording_window(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.started_at = 200
        recorder.ingest(
            {
                "@type": "updateNewMessage",
                "message": {
                    "id": 1048576,
                    "chat_id": -1001,
                    "date": 100,
                    "sender_id": {"@type": "messageSenderUser", "user_id": 42},
                    "content": {
                        "@type": "messageText",
                        "text": {"@type": "formattedText", "text": "cached"},
                    },
                },
            }
        )

        self.assertEqual(recorder.events, [])
        self.assertEqual(recorder.messages, {})

    def test_finds_and_clicks_sut_callback_button(self):
        client = FakeClient()
        recorder = record.EventRecorder(client, -1001, "", 42)
        recorder.ingest(
            {
                "@type": "updateNewMessage",
                "message": {
                    "id": 1048576,
                    "chat_id": -1001,
                    "sender_id": {"@type": "messageSenderUser", "user_id": 42},
                    "content": {
                        "@type": "messageText",
                        "text": {"@type": "formattedText", "text": "Select a provider:"},
                    },
                    "reply_markup": {
                        "@type": "replyMarkupInlineKeyboard",
                        "rows": [
                            [
                                {
                                    "text": "OpenAI",
                                    "type": {
                                        "@type": "inlineKeyboardButtonTypeCallback",
                                        "data": "bW9kZWxzX3Byb3ZpZGVyX29wZW5haQ==",
                                    },
                                }
                            ]
                        ],
                    },
                },
            }
        )

        found = recorder.find_callback_button("Select a provider", "OpenAI")
        self.assertEqual(found, (1048576, "bW9kZWxzX3Byb3ZpZGVyX29wZW5haQ=="))
        recorder.click_callback_button(*found, timeout_ms=3_000)
        self.assertEqual(
            client.requests,
            [
                (
                    {
                        "@type": "getCallbackQueryAnswer",
                        "chat_id": -1001,
                        "message_id": 1048576,
                        "payload": {
                            "@type": "callbackQueryPayloadData",
                            "data": "bW9kZWxzX3Byb3ZpZGVyX29wZW5haQ==",
                        },
                    },
                    3.0,
                )
            ],
        )

    def test_records_poll_state_and_inline_button_text(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.ingest(
            {
                "@type": "updateNewMessage",
                "message": {
                    "id": 1048576,
                    "chat_id": -1001,
                    "sender_id": {"@type": "messageSenderUser", "user_id": 42},
                    "content": {
                        "@type": "messagePoll",
                        "poll": {"@type": "poll", "is_closed": False},
                    },
                    "reply_markup": {
                        "@type": "replyMarkupInlineKeyboard",
                        "rows": [[{"text": "Choose", "type": {"@type": "inlineKeyboardButtonTypeCallback"}}]],
                    },
                },
            }
        )

        event = recorder.events[0]
        self.assertEqual(event["pollIsClosed"], False)
        self.assertEqual(event["buttonTexts"], ["Choose"])

    def test_records_closed_poll_after_content_update(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.ingest(
            {
                "@type": "updateMessageContent",
                "chat_id": -1001,
                "message_id": 1048576,
                "new_content": {
                    "@type": "messagePoll",
                    "poll": {"@type": "poll", "is_closed": True},
                },
            }
        )

        self.assertEqual(recorder.events[0]["pollIsClosed"], True)

    def test_preserves_unhandled_chat_updates_for_new_telegram_features(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.ingest(
            {
                "@type": "updateChatDraftMessage",
                "chat_id": -1001,
                "draft_message": {"@type": "draftMessage"},
            }
        )

        self.assertEqual(recorder.events[0]["kind"], "update")
        self.assertEqual(recorder.events[0]["updateType"], "updateChatDraftMessage")

    def test_records_confirmed_sent_message_before_completed_action(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        message = {
            "id": 1048576,
            "chat_id": -1001,
            "sender_id": {"@type": "messageSenderUser", "user_id": 7},
            "is_outgoing": True,
            "date": int(recorder.started_at),
            "content": {
                "@type": "messageText",
                "text": {"@type": "formattedText", "text": "confirmed"},
            },
        }

        record.record_sent_action(recorder, message, "confirmed")

        self.assertEqual([event["kind"] for event in recorder.events], ["message", "action"])
        self.assertEqual(recorder.events[0]["botApiMessageId"], 1)
        self.assertEqual(recorder.events[1]["status"], "completed")

    def test_normalizes_pending_message_as_draft_evidence(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.ingest(
            {
                "@type": "updatePendingMessage",
                "chat_id": -1001,
                "draft_id": "73",
                "can_stop": True,
                "keep_on_stop": False,
                "content": {
                    "@type": "messageText",
                    "text": {"@type": "formattedText", "text": "working"},
                },
            }
        )

        event = recorder.events[0]
        self.assertEqual(event["kind"], "draft")
        self.assertEqual(event["text"], "working")
        self.assertEqual(event["draftId"], "73")
        self.assertEqual(event["canStop"], True)

    def test_records_live_location_coordinates(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.ingest(
            {
                "@type": "updateMessageContent",
                "chat_id": -1001,
                "message_id": 1048576,
                "new_content": {
                    "@type": "messageLiveLocation",
                    "location": {
                        "@type": "liveLocation",
                        "location": {"latitude": 52.5, "longitude": 13.4},
                        "live_period": 60,
                    },
                    "expires_in": 45,
                },
            }
        )

        event = recorder.events[0]
        self.assertEqual(event["latitude"], 52.5)
        self.assertEqual(event["longitude"], 13.4)
        self.assertEqual(event["livePeriod"], 60)
        self.assertEqual(event["expiresIn"], 45)

    def test_distinguishes_live_photo_from_regular_photo(self):
        recorder = record.EventRecorder(FakeClient(), -1001, "", 42)
        recorder.ingest(
            {
                "@type": "updateNewMessage",
                "message": {
                    "id": 1048576,
                    "chat_id": -1001,
                    "date": int(recorder.started_at),
                    "sender_id": {"@type": "messageSenderUser", "user_id": 42},
                    "content": {
                        "@type": "messagePhoto",
                        "photo": {"@type": "photo"},
                        "video": {"@type": "video"},
                    },
                },
            }
        )

        self.assertEqual(recorder.events[0]["isLivePhoto"], True)


if __name__ == "__main__":
    unittest.main()
