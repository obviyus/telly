# Telly

Telly receives Telegram updates, preserves them when required, and dispatches them to bot handlers.

## Language

**Acknowledgment**:
Confirmation that Telegram may stop retaining an update.
_Avoid_: Ack

**Inbox**:
The durable collection of accepted updates that have not reached a terminal state.
_Avoid_: Queue, backlog

**Inbox store**:
The persistence interface that owns inbox atomicity, leases, ordering, and capacity.
_Avoid_: Database, repository

**Receiver**:
The polling or webhook path that validates an update and saves it before acknowledgment.
_Avoid_: Producer, ingester

**Conversation key**:
The stable value that groups updates whose handlers must start in Telegram order.
_Avoid_: Partition key, lane id

**Dispatch lease**:
Temporary exclusive authority to claim and settle inbox updates for one bot.
_Avoid_: Lock, leadership

**Fencing token**:
A strictly increasing lease value that prevents a former lease holder from changing inbox state.
_Avoid_: Lease id, worker id

**Claim**:
The atomic transition that selects an eligible update for one dispatch attempt.
_Avoid_: Dequeue, take

**Attempt**:
One claimed execution of an update handler.
_Avoid_: Try, run

**Settlement**:
The durable outcome of an attempt: done, retry, parked, or interrupted.
_Avoid_: Finalization, acknowledgment

**Replay**:
A later attempt for an update that did not reach done or parked.
_Avoid_: Redelivery

**Parked update**:
A terminal update that exhausted automatic attempts and needs operator attention.
_Avoid_: Dead letter, failed update
