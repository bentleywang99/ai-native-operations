# 4. The readiness rubric

This chapter is the standard. When StackNative's consultant tells someone their process is
Early, Ready, or Advanced, it means exactly what is written here and nothing else. The verdict
is a score, not an impression, and the person receiving it is entitled to see the arithmetic.

Six dimensions, scored 0, 1, or 2. Twelve points available.

## 1. Decision clarity

Can someone write down what a good outcome looks like, precisely enough that two experienced
people would agree on most cases?

- **0** — Nobody can articulate the rule. "You just know." Experts disagree with each other and
  with themselves on the same case a week apart.
- **1** — The common cases are describable; the edges are folklore held by one or two people.
- **2** — There is a written standard, or one could be written in a day from existing examples.

*This is the dimension that most often forces an Early verdict, and the one clients most often
score themselves too high on. A useful probe: ask for ten past cases and the reasoning. If the
reasoning is reconstructed rather than recalled, score 0 or 1.*

## 2. Data accessibility

Can a program reach the information the process needs, without a person fetching it?

- **0** — Information lives in heads, in email threads, in scanned documents, or in a system
  nobody can get data out of.
- **1** — Reachable but awkward: exports, a nightly file, one system that needs a human login.
- **2** — Available through an interface a program can call, at the moment it is needed.

## 3. Volume and repetition

Does it happen often enough that redesign pays back?

- **0** — A handful of times a month, each one materially different.
- **1** — Weekly to daily, with recognisable recurring shapes.
- **2** — Many times a day, or a smaller number of high-value units where each one matters.

*Volume is not only about payback. Low volume also starves you of the examples you need to tell
whether the redesign is working.*

## 4. Error tolerance and reversibility

What happens when the process gets one wrong?

- **0** — Errors are irreversible and expensive: money leaves, a regulator cares, a customer is
  lost, someone is harmed.
- **1** — Errors are recoverable but embarrassing or costly to fix.
- **2** — Errors are cheap and reversible, and the process already produces some today.

*A 0 here does not disqualify a process. It relocates the design toward approval checkpoints and
raises the cost of the pilot. Be explicit about that trade rather than hiding it in a score.*

## 5. Existing structure

Does the process have identifiable steps and review points, or is it one undifferentiated act
of judgment?

- **0** — One person does the whole thing start to finish, in their own way.
- **1** — Recognised stages exist, informally, differing by who is doing it.
- **2** — Documented steps with defined handoffs, and someone would notice if a step were
  skipped.

## 6. Ownership

Is there one person who can approve changing how this works?

- **0** — Change requires a committee, or ownership is genuinely contested.
- **1** — One owner, but significant changes need sign-off elsewhere.
- **2** — One owner who can decide, and who is willing to be involved weekly.

*Score this honestly even though it feels political. It is the single best predictor of whether
the work finishes, and it is the dimension that no amount of good technology compensates for.*

## The bands

| Total | Band | What it means |
|---|---|---|
| 0–5 | **Early** | Do not redesign this process yet. The preconditions are missing, and building agents on top of them produces an expensive system that nobody trusts. Fix the lowest-scoring dimension first; usually it is decision clarity or data access. |
| 6–9 | **Ready** | Redesign this process now, on its own, with checkpoints placed by Chapter 3. This is the band where a pilot pays back inside a quarter. |
| 10–12 | **Advanced** | The preconditions are strong and something is probably already partly automated. The work here is depth and scale: instrumentation, cost control, removing the remaining human steps that exist out of habit rather than consequence. |

## Rules for scoring

**Score what is true today, not what is planned.** A data integration on next quarter's roadmap
scores 0. Roadmaps slip and rubrics that price in optimism stop discriminating.

**When genuinely torn between two scores, take the lower one.** Being told you are Early and
proving it wrong in six weeks costs a client nothing. Being told you are Ready and failing costs
them a quarter and their appetite for trying again.

**A single 0 on dimension 1 or 6 caps the verdict at Early**, regardless of total. You cannot
automate a decision nobody can state, and you cannot ship a change nobody can approve. These two
are preconditions rather than contributions, and the arithmetic must reflect that.

**Show the scores.** Every read-out names the six numbers and the total. A verdict a client
cannot audit is an opinion wearing a uniform.
