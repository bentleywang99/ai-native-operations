# 5. Assessing one process

The assessment is a written review of one named process. Its job is to be defensible six months
later, when someone asks why we said what we said. Everything in this chapter serves that: the
structure, the evidence rules, and the habit of showing our scores rather than our impression.

There are two versions. The free read-out is a conversation of a few exchanges ending in scores
and a verdict; it is what the consultant on stacknative.ai produces. The paid assessment is the
same skeleton with the current state mapped from artifacts, a cost model, and a target state
written to the checkpoint form in Chapter 3. The read-out tells you whether to spend money on the
assessment. The assessment tells you whether to spend money on the redesign.

## What we deliver

1. **Scope.** The process in one sentence, its input artifact and its output artifact, its
   owner by name, and what is explicitly out of scope. If the scope sentence needs "and", it is
   two processes; pick one.
2. **Current state.** How it runs today, step by step, with the queues marked: every place work
   waits for a person. Volume, cost or cycle time, and the confidence on each number (their
   figure, our estimate, or a measurement).
3. **Scores.** All six dimensions from Chapter 4, one sentence of evidence each, the total out
   of twelve, and the band. The evidence sentence must name a fact the owner stated or an
   artifact we saw, never a feeling.
4. **Target state.** Which steps agents do, where the checkpoints sit in the five-field form
   from Chapter 3, and what is measured. Three bullets in the read-out; a page in the assessment.
5. **Cost model.** Cost per unit and per month at their stated volume, with every assumption
   listed so it can be challenged. Assessment only.
6. **First move.** One step, doable this month, by the owner named in section 1. It is almost
   always the cheapest fix to the lowest-scoring dimension, and it is often free.
7. **Biggest risk.** One paragraph, including the risk that we are wrong and how they would
   know.

## Getting the evidence

Most of the current state can be established by asking, as long as the questions are the ones
that map to the rubric. The six facts we need from the owner, in plain words:

- What the process is, what comes in, what goes out, and who owns it.
- How often it happens and what it costs in time or money.
- Whether two experienced people would handle the same case the same way, and whether the rule
  is written anywhere.
- Where the data lives and whether a program could reach it today.
- What happens when it goes wrong: caught before it leaves, fixed afterwards, or not fixable.
- Who can say yes to changing it, alone.

Owners rarely volunteer all six. They describe the pain and the wish. The consultant's job is to
keep asking for the missing facts, one or two at a time, and to reflect back what it heard so the
owner can correct it. In our regression runs the consultant needed three to six exchanges to get
there, and it reached the verdict faster when the owner answered the authority question early.

Two dimensions need more than conversation before we will put money on them:

- **Decision clarity** is the one owners score themselves highest on and the one that most often
  forces an Early verdict. Ask for ten past cases and the reasoning behind each. If the
  reasoning is recalled, the rule exists even if it is unwritten. If it is reconstructed on the
  spot, score 0 or 1 and say so. The read-out can only take the owner's word for this; the
  assessment must see the cases.
- **Data accessibility** is settled by one export. If the owner can send a sample of the real
  input in under a day, the score is at least 1. If nobody can produce one, it is 0 no matter
  what the system is supposed to be able to do.

## Where owners disagree with the score

Three disagreements come up often enough that the rubric now addresses each directly.

**The worst case versus the typical case.** Owners hear "what happens when it goes wrong" and
answer with the disaster: the lost customer, the harmed patient. Score the typical error. If most
errors are cheap and a minority are irreversible, the score is 1 and the minority is where the
checkpoint goes. That is a design fact, not a reason to score the whole process 0.

**Slow access versus no access.** An API that exists but must be requested from a vendor and
takes weeks is a 1. Slow is not impossible. Score 0 only when nobody has ever succeeded in
getting the data out.

**Shared sign-off versus no owner.** An office manager who can change scheduling but needs the
clinicians to sign off on the clinical rules is a 1: one owner, with sign-off elsewhere on part of
it. A 0 is a committee, a contested process, or an owner who is leaving with no successor. This
matters because a 0 on ownership caps the verdict at Early, and owners feel that as an insult
rather than a finding. Explain the cap before giving the score.

A fourth rule protects the owner from us: **take stated facts at face value.** If they say two
underwriters decline the same submission for the same reasons, score decision clarity 2 unless
something else they said contradicts it, and name the contradiction if so. Discounting a stated
fact without a reason is how a consultant substitutes impression for evidence.

## Three worked examples

These are three of the fictional businesses in our regression set, scored by the consultant that
runs on the site. They are invented, but the scoring is real, and they are chosen to show one
verdict in each band.

**A managing general agent, 400 broker submissions a month.** Written appetite guide; two
underwriters agree on declines; underwriting system with an API and loss runs as CSV; errors
caught before quoting and quotes withdrawable before binding; documented intake steps and a
visible queue; the head of operations can approve change alone. Scores 2, 2, 2, 2, 2, 2; total
12; **Advanced**. The consultant noted that the earlier failed OCR attempt was a tooling problem,
not a readiness problem. First move: run twenty recent submissions through an extraction pass
against the written guide and measure field accuracy before building anything. Biggest risk:
treating a high score as permission to skip the sampling checkpoint.

**A physical therapy clinic, three locations, 900 appointments a month.** Written scheduling
procedures that differ by location; clinical urgency decided by clinicians; an EHR with an API
gated by a vendor; routine errors cheap, clinical timing errors harmful; office manager owns
scheduling with clinicians signing off on the clinical rules. Scores 1, 1, 2, 1, 2, 1; total 8;
**Ready**. The target state puts routine reschedules on self-service and escalates anything
post-surgical to a person before confirmation. First move: one unified rule set across the three
locations with the clinicians' sign-off on escalation criteria, which is cheaper than the EHR
access request and fixes the weakest dimension. Biggest risk: building the self-service layer
before that rule is agreed.

**An accounting firm, 12 people, new-client onboarding.** Checklists that live in partners'
heads and differ by partner; documents arriving by email and moved by hand; 8 to 10 clients a
month in season; incomplete packages cheap to fix; no defined steps; nobody owns it. Scores 1, 0,
1, 2, 0, 0; total 4; **Early**, and capped there by ownership regardless of the total. First move:
one partner owns onboarding and writes the checklist per client type, even roughly, which fixes
two dimensions in a week for free. Biggest risk: automating the chasing on top of five unwritten
checklists, which chases the wrong things faster.

Notice what the Early verdict does. It does not say the firm should avoid AI. It says the
redesign is one week of writing things down away, and that building agents before that week
produces a system nobody trusts.

## How we check ourselves

The consultant's scores move by about a point on a given dimension between runs of the same
scenario. The bands do not move, except at boundaries where a single point of judgment tips
them, and we treat a one-band difference at a boundary as acceptable. So the regression set
asserts bands and reports scores. When the rubric changes, the set is run again before the new
prompt is deployed, and a scenario that fails is either a rubric problem or a wrong expectation,
and we decide which in writing.

Two of the eight expectations in the first set were ours to correct: we had scored a forty-a-month
reporting process as high volume when the rubric says weekly-to-daily is a 1, and we had given a
shared sign-off a 2. The book got sharper both times. That is the mechanism working.

## What the read-out cannot do

It cannot map the current state from artifacts, so it can be fooled by an owner who describes the
process as they wish it were. It cannot produce a cost model, because that needs their volume,
their labour cost, and our measured cost per unit. And it cannot see the ten past cases that
settle decision clarity. Those three things are the assessment, and they are why it costs money.
