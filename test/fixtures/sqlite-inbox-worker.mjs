import { SqliteInbox } from "../../index.ts";
import { Effect } from "effect";

const [path, updateIdText] = process.argv.slice(2);
if (path === undefined || updateIdText === undefined) {
  throw new Error("Expected database path and update id");
}
const updateId = Number(updateIdText);
const inbox = await SqliteInbox.open(path);
try {
  const result = await Effect.runPromise(inbox.save({
    botId: 123456,
    capacity: 1,
    conversationKey: `chat:${updateId}`,
    payload: { update_id: updateId },
    updateId,
  }));
  console.log(JSON.stringify(result));
} finally {
  inbox.close();
}
