# Sample AI-run readiness assessment: a process that is not ready

**Client:** an accounting firm, 12 people, United States.
**Process assessed:** new-client onboarding, specifically collecting a complete document package.
**Prepared by:** StackNative, 26 September 2026. Method: The AI-Run Company v0.5, chapters 3 to 6.

*This is a published example of the $2,500 deliverable for a process that scores **Early**. The
business is a composite built from our regression scenarios, not a client, and its figures are
illustrative. We publish it because most processes are in this band, and an assessment that only
ever says "yes, build it" is a sales document rather than a standard. The other published
example, [a submission intake process that scores Advanced](sample-assessment.html), shows the
opposite end.*

---

## 1. Scope

**Process.** A new client signs an engagement letter, and the firm collects the documents needed
to start work: prior returns, statements, entity papers, identification.

**Input artifact.** An email thread, plus whatever the client attaches to it.

**Output artifact.** A folder on the shared drive that somebody believes is complete.

**Owner.** None. Whichever accountant landed the client chases them.

**Out of scope.** The engagement letter, pricing, the tax work itself, and anything the client
sends after work has started.

## 2. Current state

Onboarding takes about three weeks of back-and-forth. Eight to ten new clients arrive a month in
season and two or three otherwise. The delay is mostly waiting on the client, then discovering
the package is incomplete and asking again.

The checklist of what to request lives in each partner's head, and it differs by client type and
by partner. Two partners given the same new client would ask for different documents, and neither
list is written down. Documents arrive by email and are dragged into a shared drive folder by
hand.

When a document is missing and nobody notices, it surfaces at filing time, and the work becomes a
scramble against a statutory deadline.

Nothing has been automated. No AI tool has been tried on this process.

## 3. Scores

| Dimension | Score | Evidence |
|---|---|---|
| Decision clarity | 0 | "Complete" is not defined anywhere. The rule for what a given client owes exists only in partners' heads, and two partners would answer differently (stated). |
| Data accessibility | 1 | Everything is reachable, in email and a shared drive, but nothing is structured: no per-client record of what was requested or received. |
| Volume and repetition | 1 | 8 to 10 a month in season, 2 to 3 otherwise. Real repetition, but below the daily cadence where a redesign pays back quickly, and seasonal. |
| Error tolerance | 1 | A missing document is recoverable, but it is discovered at filing time, against a deadline, which is where the cost sits. |
| Existing structure | 0 | No written steps, no queue, no status. Whether a client is half-onboarded is knowable only by reading the thread. |
| Ownership | 0 | Nobody owns onboarding. Changing it would need a partner meeting, and no one person could approve it. |

**Total: 3 / 12. Readiness: Early.**

Two capping rules apply, and either alone would be decisive: *a single 0 on dimension 1 or 6 caps
the verdict at Early.* You cannot automate a decision nobody can state, and you cannot ship a
change nobody can approve. The total is 3, so the caps change nothing here, but they are the
reason no amount of volume or tooling would move this verdict.

## 4. Target state: what to fix first, and in what order

This process should not be redesigned around agents yet. Building intake automation on top of an
undefined checklist produces a system that confidently collects the wrong documents. The work
below is deliberately unglamorous and needs no AI at all.

**1. Write the checklist down (fixes dimension 1).** One page per client type: individual,
partnership, S-corporation, trust. Have two partners independently list what a new client of each
type owes, then reconcile the differences in one sitting. The disagreements are the valuable part;
they are the rule nobody had written. Until this exists, nothing else is worth doing.

**2. Name an owner (fixes dimension 6).** One person who can change onboarding without convening
the partners. In a firm of twelve this is a role, not a hire, and it can be a partner who
already does most of the chasing.

**3. Give the process a visible status (fixes dimension 5).** A row per client with the
checklist as columns, and a state: requested, partially received, complete. A spreadsheet is
enough. The point is that "is this client complete?" becomes a thing you read rather than a
thing you reconstruct.

With those three done, honestly, the same rubric would score roughly 2 / 1 / 1 / 1 / 1 / 2, a
total of 8, **Ready**, and the redesign becomes worth doing: one request generated from the
client type, one upload location, automatic completeness checking against the written rule, and a
human checkpoint where a document is ambiguous rather than where it is merely arriving.

We would expect that re-assessment after roughly one season of using the checklist, not sooner.

## 5. Cost model

The honest cost model for an Early process is the cost of the preconditions, not of an agent
platform.

| Item | Assumption | Cost |
|---|---|---|
| Writing the four checklists | Two partners, one sitting of 3 hours each, plus 2 hours to reconcile | ~8 partner-hours, one time |
| Naming an owner | A decision, not a project | 0 |
| Status sheet | Half a day to set up, a few minutes per client thereafter | ~4 hours, then ~5 min per client |
| **Total to leave the Early band** | | **≈ 12 hours of partner time** |
| Software | None required | $0 |

For comparison, the redesign this unlocks would carry roughly $15 to $30 a month in model cost at
this volume, which is not the interesting number. At 8 to 10 clients a month, the return is
cycle time and the filing-season scramble, not headcount: three weeks of onboarding compressed
toward one, and completeness known on the day rather than at the deadline.

**The number most likely to be wrong** is the value of that compression. We have assumed the
delay costs the firm goodwill and a scramble rather than money. If a late package has ever cost
an extension, a penalty, or a client, that figure belongs here and changes the case entirely.

## 6. First move

Book the checklist sitting. Two partners, three hours, one client type each to draft and two to
reconcile. Do it before filing season, not during.

The test that it worked: hand a new client's engagement letter to two different partners and ask
each what documents to request. When the lists match, dimension 1 is a 2 and this process is
worth reassessing.

Owner: whoever is named in step 2. Due: within the month.

## 7. Biggest risk

That the firm buys a document-collection product instead. The market sells exactly this: a portal
that requests documents and tracks what arrived. It would work, and it would still fail here,
because a portal has to be configured with a checklist and this firm does not have one. The tool
would encode whichever partner set it up, and the other partners would keep asking by email.

The risk that we are wrong: our seasonality figure is the firm's own, unverified. If the real
in-season rate is nearer 20 new clients a month than 10, volume scores 2, the total reaches 4,
and the case for fixing the preconditions gets more urgent rather than less. The band does not
move; the caps still hold.

---

*One round of written questions from the client is included after delivery. We do not sell a
pilot against an Early process. If this assessment is right, the next money you spend with us
should be nothing at all until the checklist exists.*
