# 12. The autonomy ladder: six rungs, and which one you are on

Clients ask for a maturity model by name. This chapter is ours. It is built on the six levels
of agentic autonomy that Marty Chang set out in *I was wrong* (agent2026.substack.com, 2026),
with labels chosen so that each rung is a fact about a process rather than a feeling about a
company, and with StackNative placed on it honestly.

Two rules made the labels. A label has to describe the work, not anyone's attitude, so that
"this invoice-matching process is X" parses. And every rung has to be answerable from evidence
an assessor can see, so the ladder is usable in an assessment rather than a diagram on a slide.

## The six rungs

| Level | Label | The test an assessor applies |
|---|---|---|
| 0 | **human-run** | No AI agent in production. |
| 1 | **AI-informed** | An agent is in production, but it is used occasionally, or it reviews the human's output after the fact. |
| 2 | **AI-native** | The human initiates and does the work, and consults the agent before shipping. |
| 3 | **AI-first** | The agent initiates the work; a human reviews it before it ships. |
| 4 | **AI-run** | The agent ships on its own; a human samples the output periodically. |
| 5 | **AI-unattended** | The agent ships; there is no routine human review. |

<!-- Level 5 label: Marty's call pending as of 2026-09-22 (AI-unattended vs AI-owned vs AI-autonomous). Swap consistently throughout if he chooses differently. -->

The ladder runs from human-run at the bottom to AI-run at level 4, and the handoff between
those two is the whole story of this book. Level 5 sits past the end of it on purpose.

## Where the names came from, and one honest admission

**AI-native at level 2 is the market's usage, not ours.** As the term is currently used, an
AI-native company is one built with AI everywhere from the start, where humans still do the
work and check with the AI before shipping. Chapter 1 calls that same rung **AI-enabled**. Two
names, one rung. That coincidence is exactly why this book stopped using either word for what
we do: both describe a company where the human still touches every unit of work.

**AI-first at level 3 rescues a word we had written off.** Used as a strategic posture, "AI
first" means reaching for AI before anything else, which says nothing about delegation. Placed
on the ladder it gains a plain reading: the AI goes first, and the human reviews. That is a
real and common rung, and the first one where throughput stops being bounded by human hours.

**AI-run at level 4, not 5.** Level 4 is where the agent ships on its own and a person looks
at a slice of the output daily, weekly, or fortnightly. That is sampling, and chapter 3 makes
sampling the default checkpoint for a reversible process, because silent degradation triggers
nothing and only periodic looking catches it. A well-designed AI-run process therefore sits at
level 4 by this ladder's own definitions. Level 5 is what you get when you remove that
checkpoint. Naming our own method after the rung that lacks its own safeguard would point at
the thing we tell clients not to do.

**Why the top rung is named for what is missing.** Between level 4 and level 5, what stops is
attention, not ownership. Chapter 2 makes a named owner, a person who can approve a change to
the process and who answers for it, a precondition for the process existing at all. At level 5
that person still exists; they have simply stopped looking routinely. The label says so. It is
also the word that belongs in an incident review: "the process was unattended" describes the
situation and points at the fix.

## Level 5 is for processes, not companies

A process can reach level 5. A company cannot, and the reason is not technical. Someone must
sign the tax return, own the bank account, and answer in law when something goes wrong. That
accountability is imposed from outside by law rather than chosen by design, and it attaches to
the entity, not to any workflow inside it. Redescribing the whole company as one large process
("execute the vision") does not move it, and it fails chapter 2's own scoping test anyway: no
countable unit, no observable failure.

So a company's level is not a number. A firm is a portfolio of processes, and its honest
description is a distribution: thirty processes at level 1, eight at level 3, two at level 5.
Any single badge it wears is a vanity number. The metric an assessment can actually measure is
the share of operating hours that run above level 3.

## The pitch is fit, not altitude

Every process has a right rung, set by three things: how reversible its errors are, how far a
bad one travels before it is caught, and how novel the cases are. Some processes belong at 5.
Many belong at 4. Some should stop at 3 and stay there, because the ordinary error is the
expensive kind and a review before shipping is cheaper than any recovery. Most processes today
sit below their right rung, so most of the work is still climbing. But the promise is never
"everything to full autonomy". It is: we will tell you which processes should reach 5, which
should stop at 3, and why. That is the sentence that is still true a year later.

## How the ladder relates to the readiness rubric

They answer different questions and a client needs both.

- The **rubric** (chapter 4) asks whether *one process* is ready to be redesigned now, and
  scores six preconditions from 0 to 2. Its verdicts are Early, Ready, and Advanced.
- The **ladder** asks how much of the work an organisation has *actually delegated*, rung by
  rung, process by process.

A firm can be Advanced on one process while sitting at level 1 overall. The rubric tells you
where to start; the ladder tells you how far you have come and what the right rung is for each
process once you get there.

## Where StackNative sits

Level 4, and not intending to climb. The AI CEO ships on its own: code, outreach, the handbook
you are reading. The one human on the board reviews periodically, holds payment authority, and
signs anything binding. Level 5 is not beyond reach; it is the rung where nobody is
accountable, and chapter 11 is the record of why we think the sampling is worth its cost.

None of this is a scolding. Chapter 1 says AI-enabled is often the correct first purchase, and
that remains true here: a level-2 firm has done something real. The ladder exists so that the
next step is named, testable, and chosen for the right process.
