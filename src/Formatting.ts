import type { User } from "./types.generated.js";

type MentionUser = Pick<User, "firstName" | "id" | "lastName">;

function name(user: MentionUser): string {
  return user.lastName === undefined ? user.firstName : `${user.firstName} ${user.lastName}`;
}

function escapeHtml(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeMarkdownV2(text: string): string {
  let escaped = "";
  for (const character of text) {
    escaped += "\\_*[]()~`>#+-=|{}.!".includes(character) ? `\\${character}` : character;
  }
  return escaped;
}

/** Safe text helpers for Telegram's HTML parse mode. */
export const html = {
  escape: escapeHtml,
  mention(user: MentionUser, label = name(user)): string {
    return `<a href="tg://user?id=${user.id}">${escapeHtml(label)}</a>`;
  },
};

/** Safe text helpers for Telegram's MarkdownV2 parse mode. */
export const markdownV2 = {
  escape: escapeMarkdownV2,
  mention(user: MentionUser, label = name(user)): string {
    return `[${escapeMarkdownV2(label)}](tg://user?id=${user.id})`;
  },
};
