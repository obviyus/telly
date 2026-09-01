import { Effect } from "effect";

import { SqliteJobs } from "../../src/SqliteJobs.ts";

const [path, botIdText, fencingTokenText] = process.argv.slice(2);
if (path === undefined || botIdText === undefined || fencingTokenText === undefined) {
  throw new Error("Expected database path, bot id, and fencing token");
}

const store = await SqliteJobs.open(path);
try {
  const claimed = await Effect.runPromise(store.claim({
    botId: Number(botIdText),
    fencingToken: Number(fencingTokenText),
    limit: 1,
  }));
  console.log(JSON.stringify(claimed.map((job) => job.id)));
} finally {
  store.close();
}
