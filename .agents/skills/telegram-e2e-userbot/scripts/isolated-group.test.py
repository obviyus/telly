import importlib.util
import sys
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).with_name("isolated-group.py")
SPEC = importlib.util.spec_from_file_location("tg_isolated_group", SCRIPT_PATH)
group = importlib.util.module_from_spec(SPEC)
sys.modules["tg_isolated_group"] = group
SPEC.loader.exec_module(group)


class ReusableFixtureTest(unittest.TestCase):
    def test_accepts_owned_two_member_group_with_leased_bot(self):
        self.assertTrue(
            group.reusable_fixture(
                -1002,
                {"@type": "chatTypeSupergroup"},
                {
                    "is_channel": False,
                    "member_count": 2,
                    "status": {"@type": "chatMemberStatusCreator"},
                },
                {"@type": "chatMemberStatusAdministrator"},
                -1001,
            )
        )

    def test_rejects_shared_configured_or_extra_member_groups(self):
        owner = {"member_count": 2, "status": {"@type": "chatMemberStatusCreator"}}
        bot = {"@type": "chatMemberStatusMember"}

        self.assertFalse(
            group.reusable_fixture(
                -1001,
                {"@type": "chatTypeBasicGroup"},
                owner,
                bot,
                -1001,
            )
        )
        self.assertFalse(
            group.reusable_fixture(
                -1002,
                {"@type": "chatTypeBasicGroup"},
                {**owner, "member_count": 3},
                bot,
                -1001,
            )
        )

    def test_rejects_non_owner_left_bot_and_channels(self):
        owner = {"member_count": 2, "status": {"@type": "chatMemberStatusCreator"}}

        self.assertFalse(
            group.reusable_fixture(
                -1002,
                {"@type": "chatTypeSupergroup"},
                {**owner, "status": {"@type": "chatMemberStatusAdministrator"}},
                {"@type": "chatMemberStatusMember"},
                -1001,
            )
        )
        self.assertFalse(
            group.reusable_fixture(
                -1002,
                {"@type": "chatTypeSupergroup"},
                owner,
                {"@type": "chatMemberStatusLeft"},
                -1001,
            )
        )
        self.assertFalse(
            group.reusable_fixture(
                -1002,
                {"@type": "chatTypeSupergroup"},
                {**owner, "is_channel": True},
                {"@type": "chatMemberStatusMember"},
                -1001,
            )
        )


if __name__ == "__main__":
    unittest.main()
