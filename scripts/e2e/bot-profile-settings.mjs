import { setTimeout as delay } from "node:timers/promises";

import {
  Application,
  deleteMyCommands,
  getMyCommands,
  getChatMenuButton,
  getMyDefaultAdministratorRights,
  getMyDescription,
  getMyName,
  getMyShortDescription,
  setMyCommands,
  setChatMenuButton,
  setMyDefaultAdministratorRights,
  setMyDescription,
  setMyName,
  setMyShortDescription,
} from "../../index.ts";
import {
  createMethodProof,
  openTelegramTestHarness,
  publishMethodProof,
} from "./harness.mjs";

const harness = await openTelegramTestHarness();
const { credential, proxy } = harness;
const app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
const scope = { type: "default" };
const menuChatId = Number(credential.testerUserId);
if (!Number.isSafeInteger(menuChatId)) throw new Error("Leased Telegram tester id is not a safe integer");
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
  const verdict = createMethodProof(method, observation, [{
      elapsedMs: Math.round(performance.now() - start),
      kind: "bot_api_result",
      observation,
    }]);
  return publishMethodProof(verdict, credential);
}

try {
  snapshot = {
    commands: await app.run(getMyCommands({ scope })),
    menuButton: await app.run(getChatMenuButton({ chatId: menuChatId })),
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
    menuButton: snapshot.menuButton.type === "commands" ? { type: "default" } : { type: "commands" },
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
    "setChatMenuButton",
    setChatMenuButton({ chatId: menuChatId, menuButton: temporary.menuButton }),
    async (result) => {
      const menuButton = await waitForRead(
        () => app.run(getChatMenuButton({ chatId: menuChatId })),
        (value) => value.type === temporary.menuButton.type,
        "setChatMenuButton",
      );
      return { result, type: menuButton.type };
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
      app.run(setChatMenuButton({ chatId: menuChatId, menuButton: snapshot.menuButton })),
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
            app.run(getChatMenuButton({ chatId: menuChatId })),
          ]),
          ([commands, description, name, rights, shortDescription, menuButton]) =>
            JSON.stringify(commands) === JSON.stringify(snapshot.commands) &&
            description.description === snapshot.description &&
            name.name === snapshot.name &&
            JSON.stringify(rights) === JSON.stringify(snapshot.rights) &&
            shortDescription.shortDescription === snapshot.shortDescription &&
            JSON.stringify(menuButton) === JSON.stringify(snapshot.menuButton),
          "bot profile cleanup",
        );
      } catch (error) {
        cleanupErrors.push(error);
      }
    }
  }
  for (const close of [() => app.close(), () => harness.close()]) {
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
