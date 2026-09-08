# 6. Designing the target state

The target state is the redesigned process: which steps agents do, where the checkpoints sit,
and what gets measured. It is the part of an assessment a client will argue with, and it should
be, because it is a design and designs have alternatives. This chapter is the rules we hold to
when we draw one, and a worked example.

## Start from the current state, not from the tools

Lay the current process out as steps with the queues marked, as in Chapter 5, section 2. Every
place the work waits for a person is a candidate for change, and the waits are usually where the
time goes: in the sample assessment, keying a submission took 20 minutes and waiting for a
missing document took three days. The redesign that removes the keying and leaves the wait
saves labour but not cycle time. Say which one the client is buying.

Then ask of every step, in order: does it still need to exist; if so, can an agent do it; if so,
what has to be true for a person to trust that it did.

## Five rules

**Delete before you automate.** The cheapest step is one that no longer exists. A surprising
number of steps exist because a system once lacked a feature, or because a person who left
wanted a copy of everything. Ask what would break if the step were skipped for a month. If the
answer is "nothing anyone would notice", it goes.

**Design the escalation path before the happy path.** The happy path gets attention on its
own. What the system does when it cannot proceed decides whether people trust it, and it is the
part that is always half-built. For every agent step, write what happens on: a missing input, a
low-confidence output, a case the rules do not cover, and a downstream system that is down. Each
answer is either "proceed with a flag", "hand to a named person", or "stop and wait", and each
needs a time limit after which something else happens.

**One writer per artifact.** Two agents that can both modify the same record will eventually
disagree, and finding out why costs more than the parallelism saved. Give every record, file,
and message one writer. Other agents read, propose, or ask that writer.

**Instrument at the boundary.** Four numbers: cost per run, escalation rate, error rate at the
checkpoints, and queue depth. If a design cannot produce them from the first day, it is not
finished. They are what the weekly report to the owner is made of, and they are what tells you
when to widen sampling or remove a checkpoint.

**The human steps that remain must be worth a human.** If a person's role in the target state is
to click approve on things they never reject, you have designed a rubber stamp, which is worse
than no checkpoint because it manufactures assurance. Either give them what they would need to
reject (the source alongside the output, the confidence flags, the rule that was applied) or
remove the step and say so in writing.

## Placing the checkpoints

Chapter 3 gives the four kinds: approval, escalation, sampling, exception handling. The choice
follows from the scores in Chapter 4.

- **Error tolerance 2** (cheap, reversible): sampling. Review a slice afterwards; widen it when
  the error rate rises.
- **Error tolerance 1** (recoverable but costly): escalation on the triggers that mark the
  costly minority, sampling on the rest. Name the minority; it came out of the assessment.
- **Error tolerance 0** (irreversible): approval before the action, every time, and the design
  should make the approver's job fast: the fewer things they approve, the better they approve
  them.
- **Decision clarity 1**: the edge cases the rule does not settle go to a person as exceptions,
  and each decision the person makes is a candidate sentence for the rule. This is how a 1
  becomes a 2 over a quarter.
- **Data accessibility 1**: extraction has a confidence flag and a sampling checkpoint until
  measured accuracy is known.

Write every checkpoint in the five-field form (trigger, who, sees, can do, if no response).
The last field is where designs fail in practice: a checkpoint with no timeout is a queue that
grows while its owner is on holiday.

## Worked example: broker submission intake

From the sample assessment. Current state: five steps, two waits (missing documents, and an
underwriter's availability for edge cases), about 200 staff-hours a month.

Step by step:

| Current step | Target | Why |
|---|---|---|
| Open and file the email | Agent files it and opens a document request if the packet is incomplete, listing exactly what is missing | Removes the first wait's back-and-forth; the request is precise instead of "please send the rest" |
| Read the packet, decide if complete | Agent, with a confidence flag | Deletes a judgment that the written checklist already makes |
| Key ~60 fields | Agent extracts to a draft record | The step that costs the most and adds the least |
| Check appetite against the guide | Agent applies the written guide; declines cite the paragraph | Decision clarity scored 2; the rule exists |
| Send decline or assign underwriter | Agent drafts; a person sends declines; underwriters get only in-appetite work | Sending a decline to a broker is outward and not reversible, so a person sends it |

Three checkpoints, in the five-field form, are in the sample assessment: a sampling check on
extraction (every tenth clean record, plus any low-confidence field), an approval on declines
that relaxes to sampling once accuracy is proven, and exception handling for cases the guide does
not settle, where each underwriter decision can become a sentence in the guide.

What was deleted: the manual completeness check, and the underwriter's involvement in declines
the guide already settles. What was kept on purpose: the underwriter's review of everything in
appetite, because that review is the product, not overhead.

Measured at the boundary: cycle time from arrival to record-or-decline, field accuracy at the
sampling checkpoint, decline overturn rate, share of submissions needing a document request,
cost per submission.

## Two failure patterns

**The automated rubber stamp.** A design that keeps every human step and puts an agent in front
of each. It looks safe and changes nothing: the people still touch every unit, now with an extra
thing to read. The fix is the fifth rule: each remaining human step must be one where the person
can actually say no.

**The invisible queue.** A design where exceptions go "to the team". Nobody is named, nothing
times out, and the exceptions accumulate until a customer calls. The fix is the five-field form
with a real name in the "who" field and a real action in "if no response".

## What the client signs off

The target state in an assessment is one page: the step table, the checkpoint table, and the
four measurements. The owner named in the scope should be able to read it in ten minutes and say
which steps they disagree with. If they cannot, it is written for us, not for them.
