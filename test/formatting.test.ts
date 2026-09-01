import { expect, test } from "bun:test";

import { html, markdownV2 } from "../index.ts";

test("html escapes dynamic text and mention labels", () => {
  const user = { firstName: "Ada &", id: 101, isBot: false, lastName: "<Lovelace>" };

  expect(html.escape("5 < 7 && 9 > 3")).toBe("5 &lt; 7 &amp;&amp; 9 &gt; 3");
  expect(html.mention(user)).toBe(
    '<a href="tg://user?id=101">Ada &amp; &lt;Lovelace&gt;</a>',
  );
  expect(html.mention(user, "<Admin>")).toBe(
    '<a href="tg://user?id=101">&lt;Admin&gt;</a>',
  );
});

test("markdownV2 escapes every reserved character", () => {
  const reserved = [
    ["\\", "\\\\"],
    ["_", "\\_"],
    ["*", "\\*"],
    ["[", "\\["],
    ["]", "\\]"],
    ["(", "\\("],
    [")", "\\)"],
    ["~", "\\~"],
    ["`", "\\`"],
    [">", "\\>"],
    ["#", "\\#"],
    ["+", "\\+"],
    ["-", "\\-"],
    ["=", "\\="],
    ["|", "\\|"],
    ["{", "\\{"],
    ["}", "\\}"],
    [".", "\\."],
    ["!", "\\!"],
  ] as const;

  for (const [input, expected] of reserved) {
    expect(markdownV2.escape(input)).toBe(expected);
  }
  expect(markdownV2.escape("plain 123")).toBe("plain 123");
});

test("markdownV2 mentions escape their visible label", () => {
  const user = { firstName: "Ada_", id: 103, isBot: false, lastName: "[Lovelace]" };

  expect(markdownV2.mention(user)).toBe(
    "[Ada\\_ \\[Lovelace\\]](tg://user?id=103)",
  );
  expect(markdownV2.mention(user, "Admin!")).toBe(
    "[Admin\\!](tg://user?id=103)",
  );
});
