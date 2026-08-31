# Use one dispatch lease per bot

One inbox worker holds a fenced dispatch lease for each bot and runs different conversation keys concurrently through Telly's dispatcher. Independent per-update workers could scale further, but they cannot preserve Telly's same-conversation ordering during lease expiry without exposing distributed coordination to every store adapter. A standby process takes a newer fencing token after expiry; stale workers cannot settle inbox state, while external side effects remain honestly at least once.
