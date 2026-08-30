import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

import {
  Application,
  deleteMyCommands,
  getMyCommands,
  getMyDefaultAdministratorRights,
  getMyDescription,
  getMyName,
  getMyShortDescription,
  setMyCommands,
  setMyDefaultAdministratorRights,
  setMyDescription,
  setMyName,
  setMyShortDescription,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const credential = await acquireTelegramTestCredential({ convexProjectDir });
const proxy = await startTelegramTestApiProxy({
  leaseHealth: {
    assertHealthy: credential.assertLeaseHealthy,
    whenUnhealthy: credential.whenLeaseUnhealthy,
  },
});
const app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
const scope = { type: "default" };
let snapshot;
let runError;

async function waitForRead(read, matches, label) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const value = await read();
    if (matches(value)) return value;
    await delay(100);
  }
  throw new Error(`${label} did not become visible`);
}

async function record(method, operation, verify) {
  credential.assertLeaseHealthy();
  const start = performance.now();
  const result = await app.run(operation);
  const observation = await verify(result);
  const verdict = {
    method,
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{
      elapsedMs: Math.round(performance.now() - start),
      kind: "bot_api_result",
      observation,
    }],
  };
  const serialized = `${JSON.stringify(verdict, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) throw new Error(`${method} proof contains leased identity data`);
  }
  if (artifactDir !== undefined) {
    const methodDir = path.resolve(repoRoot, artifactDir, method);
    await mkdir(methodDir, { recursive: true });
    await writeFile(
      path.join(methodDir, `${verdict.recorded_time.slice(0, 10)}.json`),
      serialized,
      { flag: "wx" },
    );
  }
  return verdict;
}

try {
  snapshot = {
    commands: await app.run(getMyCommands({ scope })),
    description: (await app.run(getMyDescription({}))).description,
    name: (await app.run(getMyName({}))).name,
    rights: await app.run(getMyDefaultAdministratorRights({})),
    shortDescription: (await app.run(getMyShortDescription({}))).shortDescription,
  };
  const suffix = Date.now().toString(36);
  const temporary = {
    commands: [{ command: "tellyproof", description: `Telly proof ${suffix}` }],
    description: `Telly description proof ${suffix}`,
    name: `Telly Proof ${suffix}`,
    shortDescription: `Telly short proof ${suffix}`,
  };
  const verdicts = [];

  verdicts.push(await record("setMyName", setMyName({ name: temporary.name }), async (result) => {
    await waitForRead(
      () => app.run(getMyName({})),
      (value) => value.name === temporary.name,
      "setMyName",
    );
    return { matches: true, result };
  }));
  verdicts.push(await record(
    "setMyDescription",
    setMyDescription({ description: temporary.description }),
    async (result) => {
      await waitForRead(
        () => app.run(getMyDescription({})),
        (value) => value.description === temporary.description,
        "setMyDescription",
      );
      return { matches: true, result };
    },
  ));
  verdicts.push(await record(
    "setMyShortDescription",
    setMyShortDescription({ shortDescription: temporary.shortDescription }),
    async (result) => {
      await waitForRead(
        () => app.run(getMyShortDescription({})),
        (value) => value.shortDescription === temporary.shortDescription,
        "setMyShortDescription",
      );
      return { matches: true, result };
    },
  ));
  verdicts.push(await record(
    "setMyCommands",
    setMyCommands({ commands: temporary.commands, scope }),
    async (result) => {
      const commands = await waitForRead(
        () => app.run(getMyCommands({ scope })),
        (value) => value.length === 1,
        "setMyCommands",
      );
      return { commandCount: commands.length, result };
    },
  ));
  verdicts.push(await record(
    "deleteMyCommands",
    deleteMyCommands({ scope }),
    async (result) => {
      const commands = await waitForRead(
        () => app.run(getMyCommands({ scope })),
        (value) => value.length === 0,
        "deleteMyCommands",
      );
      return { commandCount: commands.length, result };
    },
  ));
  verdicts.push(await record(
    "setMyDefaultAdministratorRights",
    setMyDefaultAdministratorRights({ rights: snapshot.rights }),
    async (result) => {
      await waitForRead(
        () => app.run(getMyDefaultAdministratorRights({})),
        (value) => JSON.stringify(value) === JSON.stringify(snapshot.rights),
        "setMyDefaultAdministratorRights",
      );
      return { matches: true, result };
    },
  ));

  console.log(JSON.stringify({ ok: true, verdicts }));
} catch (error) {
  runError = error;
} finally {
  const cleanupErrors = [];
  if (snapshot !== undefined) {
    const commandRestore = snapshot.commands.length === 0
      ? deleteMyCommands({ scope })
      : setMyCommands({ commands: snapshot.commands, scope });
    const results = await Promise.allSettled([
      app.run(setMyName({ name: snapshot.name })),
      app.run(setMyDescription({ description: snapshot.description })),
      app.run(setMyShortDescription({ shortDescription: snapshot.shortDescription })),
      app.run(commandRestore),
      app.run(setMyDefaultAdministratorRights({ rights: snapshot.rights })),
    ]);
    cleanupErrors.push(...results.flatMap((result) =>
      result.status === "rejected" ? [result.reason] : []
    ));
    if (cleanupErrors.length === 0) {
      try {
        await waitForRead(
          () => Promise.all([
            app.run(getMyCommands({ scope })),
            app.run(getMyDescription({})),
            app.run(getMyName({})),
            app.run(getMyDefaultAdministratorRights({})),
            app.run(getMyShortDescription({})),
          ]),
          ([commands, description, name, rights, shortDescription]) =>
            JSON.stringify(commands) === JSON.stringify(snapshot.commands) &&
            description.description === snapshot.description &&
            name.name === snapshot.name &&
            JSON.stringify(rights) === JSON.stringify(snapshot.rights) &&
            shortDescription.shortDescription === snapshot.shortDescription,
          "bot profile cleanup",
        );
      } catch (error) {
        cleanupErrors.push(error);
      }
    }
  }
  for (const close of [() => app.close(), () => proxy.close(), () => credential.release()]) {
    try {
      await close();
    } catch (error) {
      cleanupErrors.push(error);
    }
  }
  const errors = [...(runError === undefined ? [] : [runError]), ...cleanupErrors];
  if (errors.length > 0) {
    console.error(JSON.stringify({
      error: errors.map((error) => error instanceof Error ? error.message : String(error)).join("; "),
      ok: false,
    }));
    throw new AggregateError(errors, "Bot profile proof failed");
  }
}
