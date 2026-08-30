import { getMe } from "../index.ts";

// @ts-expect-error Bot API methods with no fields take no arguments.
getMe({});
