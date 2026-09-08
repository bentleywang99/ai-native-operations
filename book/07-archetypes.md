# 7. Process archetypes and their redesigns

Most business processes that are worth redesigning are one of six shapes, or two or three of
them in sequence. Naming the shapes does two things. It gives the assessment a vocabulary the
client already half-knows, and it exposes that the slow part is usually a handoff between two
shapes rather than any step inside one.

For each archetype: how to recognise it, why it is usually slow, the target state, the
checkpoint that matters most, and the cost pattern. The examples are from our regression set of
fictional businesses and from the sample assessment.

## 1. Triage and route

**Recognise it.** Things arrive, someone reads each one, decides what it is and where it goes.
Support email, broker submissions, applications, leads, inbound contact forms.

**Why it is slow.** The reading is fast; the deciding waits on the one person who knows the
rules, and the rules are in their head. Volume is high, so the queue is always non-empty.

**Target state.** An agent classifies against a written rule set and routes; anything the rules
do not settle goes to a named person as an exception, and each of their decisions is a candidate
sentence for the rules. Routing is reversible, so the checkpoint is sampling plus exceptions,
not approval.

**The checkpoint that matters.** Exception handling with a timeout. Triage exceptions pile up
invisibly if "the team" owns them.

**Cost.** Cheap per unit (a short input, a short output, a cached rule set), so the economics
are dominated by volume. This is the archetype where a $0.02 unit replaces a $3 unit.

*Example:* the MGA's submission intake, first half. Decision clarity 2 because the appetite guide
is written; 30% of submissions are declines the guide already settles.

## 2. Extract and file

**Recognise it.** An unstructured document becomes a structured record. Invoices, forms, loss
runs, contracts, onboarding packets.

**Why it is slow.** Keying. It is the step with the most labour and the least judgment, and
because it is boring the error rate is real.

**Target state.** An agent extracts to a draft record with a confidence flag per field; a
sampling checkpoint compares source and draft side by side until measured accuracy is known;
the record is written by exactly one writer into the system of record.

**The checkpoint that matters.** Sampling, sized by measured accuracy, not by comfort. Start at
one in ten and widen or narrow with the numbers.

**Cost.** Dominated by input tokens: pages in, fields out. Long documents cost real money, so
extract what the record needs, not the whole packet.

*Example:* the MGA's submission intake, second half; the first move in the sample assessment is
a 20-document accuracy measurement before anything is built.

## 3. Draft and review

**Recognise it.** Produce a document a person approves: proposals, client reports, decline
letters, grant applications, replies.

**Why it is slow.** Assembly. The information is in three or four places and the drafter
spends most of the time collecting it, not writing. Then a reviewer reviews everything because
nothing marks what needs review.

**Target state.** An agent assembles the draft from the sources through their interfaces and
marks what it was unsure of; a person edits and sends. Sending to an outside party is not
reversible, so the human step stays, but it becomes a real review of a flagged draft rather than
a rubber stamp of a whole document.

**The checkpoint that matters.** Approval of anything outward-facing, made fast by flags. The
fifth design rule in Chapter 6 applies: the reviewer must be able to reject.

**Cost.** Moderate: several thousand tokens in, a page out. The cache matters here; keep the
template and the pricing sheet in the stable prefix.

*Examples:* the SaaS proposals (Advanced, once the pricing sheet is in reach of a program); the
agency's monthly reports (Advanced, two of five sources already connected); the nonprofit's
grants, scored Early because each application is unique and the owner is leaving.

## 4. Research and summarise

**Recognise it.** Gather from many sources and condense for a decision: due diligence,
competitor notes, a briefing before a call, the first read of a submission.

**Why it is slow.** Breadth. A person can read only so much, so they read what they know and
miss what they do not.

**Target state.** An agent gathers by a written source list, cites everything, and produces a
summary in a fixed shape; the person decides. Because the output informs a decision rather than
taking an action, the checkpoint is the decision itself; the risk is a confident summary of a
wrong source, so citations are not optional.

**The checkpoint that matters.** Novelty: a source the list has not seen before goes to a
person before it is trusted.

**Cost.** The most variable of the six: it scales with how much is read. Cap the source list and
the depth, and measure cost per summary from day one.

*Example:* none in our set yet. The consulting read-out itself is a small one: it gathers six
facts and condenses them to a band.

## 5. Monitor and alert

**Recognise it.** Watch a stream and act or escalate on conditions: carrier check calls,
shipment status, appointment confirmations, system health, payment failures.

**Why it is slow.** It is not slow; it is expensive, because a person is paid to watch a thing
that mostly does not change.

**Target state.** An agent polls or listens, applies written conditions, acts on the routine
ones (a status update, a reminder), and escalates the defined exceptions with the evidence
attached. Escalation is the workhorse checkpoint here, with a time limit and a fallback person.

**The checkpoint that matters.** Escalation on the costly minority, named in the assessment.
For the freight brokerage it was late-notice misses; for the clinic it was post-surgical timing.

**Cost.** Many small calls. The unit is cheap; the count is large; the daily cap is the control.

*Examples:* the freight brokerage's check calls (Advanced, 600 loads a month, documented script);
the clinic's scheduling (Ready, with the clinical minority escalated).

## 6. Reconcile

**Recognise it.** Two sources that should agree and do not: bank against ledger, CRM against
billing, inventory against orders, the waitlist against the purchases tab.

**Why it is slow.** The comparison is easy; explaining the differences is a chase across people
and systems, and the chase is what takes the week.

**Target state.** An agent matches what matches, classifies the differences by written cause
(timing, duplicate, missing, genuine error), resolves the causes with a written resolution, and
hands the rest to a person with the two records side by side. Money is involved often enough
that resolution beyond a threshold is an approval.

**The checkpoint that matters.** Approval above a value threshold; sampling below it.

**Cost.** Low per unit, but the inputs are structured, so the tempting mistake is to feed whole
tables to a model. Match with code; explain with the model.

*Example:* our own ledger against the bank, once there is a bank; the reason the board holds
payment authority and the CEO holds read-only access.

## Sequences

Real processes chain these. Broker intake is triage, then extract, then a short draft (the
decline letter). Client onboarding at the accounting firm is extract and file with a chase
loop, which is monitor and alert pointed at the client. Reporting at the agency is research and
summarise feeding draft and review.

The handoff between two shapes is usually where the wait lives, because a handoff is where one
person's queue becomes another's. When an assessment finds that the slow step is a handoff, the
redesign is often to let one agent carry the item across both shapes, with a single checkpoint
at the end, rather than to speed each shape separately.

## What this chapter does not say

It does not say which archetypes are worth redesigning. That is Chapter 4's job, and a process
that is a perfect example of an archetype can still score Early if nobody owns it or the rule
lives in one person's head. The archetype tells you what the target state looks like; the rubric
tells you whether to build it yet.
