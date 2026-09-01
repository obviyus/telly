# Telly

Telly receives Telegram updates, preserves them when required, and dispatches updates and scheduled jobs to bot handlers.

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

**Job**:
Named durable work that runs once or repeats at a fixed interval.
_Avoid_: Task, timer

**Job definition**:
The stable name, payload schema, and handler for one kind of job.
_Avoid_: Callback, registration

**Job identifier**:
The stable value that identifies one job across attempts and repeating occurrences.
_Avoid_: Task id, timer id

**Job store**:
The persistence interface that owns job atomicity, leases, timing, recurrence, and capacity.
_Avoid_: Database, repository

**Receiver**:
The polling or webhook path that validates an update and saves it before acknowledgment.
_Avoid_: Producer, ingester

**Conversation key**:
The stable value that groups updates whose handlers must start in Telegram order.
_Avoid_: Partition key, lane id

**Dispatch lease**:
Temporary exclusive authority to claim and settle one kind of durable work for one bot.
_Avoid_: Lock, leadership

**Fencing token**:
A strictly increasing lease value that prevents a former lease holder from changing inbox state.
_Avoid_: Lease id, worker id

**Claim**:
The atomic transition that selects an eligible update for one dispatch attempt.
_Avoid_: Dequeue, take

**Attempt**:
One claimed execution of an update or job handler.
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

**Parked job**:
A terminal job that exhausted automatic attempts and no longer repeats.
_Avoid_: Dead job, failed task
