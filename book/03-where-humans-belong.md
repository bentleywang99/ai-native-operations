# 3. Where humans belong

The phrase "human in the loop" is used to mean everything and therefore means nothing. It gets
said in board meetings to make an AI plan sound safe, without anyone specifying which human,
looking at what, with what authority, and how often.

An AI-native process needs the specific version. A **checkpoint** is a named place where a named
person sees a defined thing and can do something about it. Everything else is decoration.

## Put checkpoints where consequences are

The instinct is to review the work the system is worst at. That is backwards. Review the work
where being wrong is most expensive, whether or not the system is likely to be wrong there.

Three properties decide whether a step needs a human.

**Reversibility.** Can the action be undone cheaply? Filing something in the wrong folder is
reversible in seconds. Sending a message to a customer is not reversible at all. Money moving
is somewhere in between, depending on your bank and your lawyer.

**Blast radius.** Does the mistake affect one unit or all of them? A wrong answer on one ticket
costs one ticket. A wrong change to the rule that classifies all tickets costs every ticket
until someone notices. Configuration deserves more human attention than execution, and this is
routinely inverted in practice.

**Novelty.** Is this case like the ones we have seen? A system's confidence is a poor proxy for
correctness, but distance from anything in its history is a decent one. Route the strange cases
to a person.

## The four kinds of checkpoint

**Approval.** Nothing proceeds until a person says yes. Expensive, and the only correct choice
for irreversible high-blast-radius actions. Use it sparingly or people rubber-stamp, which is
worse than no checkpoint because it manufactures false assurance.

**Escalation.** The system proceeds by default and pulls a human in on defined triggers:
novelty, low confidence, a value threshold, an explicit customer request for a person. This is
the workhorse.

**Sampling.** The system proceeds, and a person reviews a random slice afterward. Cheap, and the
only way to catch quiet degradation, because quiet degradation by definition does not trigger
anything. If you have one checkpoint and the process is reversible, make it this one.

**Exception handling.** The system stops and hands over when it cannot proceed. Not really a
quality control, but it must be designed anyway, or the work silently piles up.

## Writing them down

A checkpoint that is not written down does not exist; it is a habit that will decay when the
person who held it changes roles. The written form we use has five fields.

| Field | Example |
|---|---|
| Trigger | Refund amount over $500 |
| Who | Support lead |
| Sees | Ticket, customer history, the agent's proposed refund and reason |
| Can do | Approve, reduce, deny, escalate to finance |
| If no response | Hold 24 hours, then escalate to the finance owner |

The last row is the one people forget, and it is the one that decides whether your process
survives a vacation.

## The trap

Every checkpoint you add costs human attention, which is the scarce resource you redesigned the
process to conserve. A process with a checkpoint on every step is the old process with extra
steps and a higher bill. The goal is not maximum oversight. It is oversight placed where it
changes outcomes, and absent everywhere else, deliberately and in writing.
