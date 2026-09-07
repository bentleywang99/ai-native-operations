# Sample AI-native readiness assessment

**Client:** a managing general agent in commercial property insurance, 60 people, United States.
**Process assessed:** broker submission intake.
**Prepared by:** StackNative, 7 September 2026. Method: The AI-Native Operations Handbook v0.1, chapters 3 to 6.

*This is a published example of the $2,500 deliverable. The business is a composite built from
our regression scenarios, not a client, and its figures are illustrative. The structure, the
scoring, and the cost model are exactly what a paying client receives; a real assessment differs
only in being grounded in that client's artifacts (ten past cases and one data export) and in
carrying their real volumes and costs.*

---

## 1. Scope

**Process.** A broker sends a submission (PDFs, ACORD forms, an email) and the MGA either
declines it with a reason or keys it into the underwriting system as a bind-ready record.

**Input artifact.** Submission packet: ACORD 125/140 forms, a schedule of values, loss runs,
covering email.

**Output artifact.** A complete record in the underwriting system, tagged in-appetite, or a
decline sent to the broker citing the guideline.

**Owner.** Head of Operations (can approve changes to intake alone).

**Out of scope.** Underwriting judgment on in-appetite risks, pricing, binding, endorsements,
renewals, and anything touching the loss-run vendor's contract.

## 2. Current state

| Step | Who | Time | Waits on |
|---|---|---|---|
| 1. Submission arrives by email; intake staff open and file it | Intake (4 FTE) | 5 min | Nothing |
| 2. Read the packet, decide if the SOV and loss runs are present | Intake | 5–10 min | Missing documents: email broker, wait 1–3 days |
| 3. Key ~60 fields into the underwriting system | Intake | 15–25 min | Nothing |
| 4. Check appetite against the written guide; decline or route | Intake, with underwriter for edge cases | 5 min | Underwriter availability, ~2 hours |
| 5. Send decline email with reason, or assign to an underwriter | Intake | 3 min | Nothing |

**Volume.** 400 submissions a month (stated; consistent with 4 intake staff at 20–40 minutes each).
**Cycle time.** Median 1 business day; 3 to 5 days when documents are missing (stated).
**Cost.** About 200 staff-hours a month at the stated 20–40 minutes each; at a loaded $35 an hour,
roughly **$7,000 a month** in intake labour before any underwriter time. (Client's figure for
hours; our assumption for the rate.)
**Decline rate.** About 30% of submissions declined for reasons that are in the guide (stated).
**Where it waits.** Missing documents (step 2) and underwriter availability on edge cases (step 4)
account for nearly all of the tail.

## 3. Scores

| Dimension | Score | Evidence |
|---|---|---|
| Decision clarity | 2 | Written appetite guide; two underwriters decline the same submission for the same reasons (stated). |
| Data accessibility | 1 | Underwriting system has an API; loss runs arrive as CSV; the input packet is unstructured PDF, so extraction is required. |
| Volume and repetition | 2 | 400 a month, about 18 a working day, with three recurring shapes (clean, missing documents, edge case). |
| Error tolerance | 2 | Keying errors are caught by the underwriter before quoting; quotes can be withdrawn before binding. |
| Existing structure | 2 | Five documented steps with handoffs; a visible queue; someone notices a skipped step. |
| Ownership | 2 | Head of Operations can approve change alone and is involved daily. |

**Total: 11 / 12. Readiness: Advanced.** No capping rule applies.

The consultant's read-out scored data accessibility 2 in one run and 1 in another; we take the
lower, per the rubric's rule when torn, because the packet is unstructured and extraction accuracy
is unproven.

## 4. Target state

**What agents do.**
- Extract the ~60 fields from the packet (forms, SOV, loss runs) into a structured draft record.
- Check the draft against the written appetite guide and produce one of three outcomes: clean
  and in appetite; declined with the guideline paragraph cited; or edge case with the specific
  ambiguity named.
- Push clean records to the underwriting system through its API; draft the decline email for
  the broker; open a document request to the broker when the packet is incomplete, listing
  exactly what is missing.

**Where humans stay.** Three checkpoints, written in the Chapter 3 form.

| Field | Checkpoint A: extraction sample | Checkpoint B: declines | Checkpoint C: edge cases |
|---|---|---|---|
| Trigger | Every 10th clean record, plus any record with a low-confidence field | Every decline for the first month; 1 in 5 after accuracy is above 98% | Any submission the guide does not settle |
| Who | Intake lead | Intake lead | Underwriter on duty |
| Sees | Packet pages side by side with extracted fields, confidence flags | Draft decline with the cited guideline paragraph highlighted | Packet, draft record, the ambiguity named by the agent |
| Can do | Approve, correct fields, reject to manual keying | Send, edit and send, overturn to in-appetite | Decide, and add a sentence to the guide if the case recurs |
| If no response | Record waits; after 4 hours escalates to the Head of Operations | Decline waits; nothing is sent without a person | Waits on the underwriter queue as today |

**What is measured.** Cycle time from arrival to record-or-decline; field-level extraction
accuracy at checkpoint A; decline accuracy against the guide (overturn rate at checkpoint B);
share of submissions needing a document request; cost per submission.

**What changes for the team.** Intake staff move from keying to reviewing. The decline step,
which today waits on an underwriter for edge cases, becomes immediate for the 30% the guide
already settles.

## 5. Cost model

Assumptions are listed so they can be challenged. Model costs are at the vendor's list price
for a current mid-tier model, September 2026.

| Item | Assumption | Per submission | Per month (400) |
|---|---|---|---|
| Document extraction | 20 pages of forms and loss runs at ~1,500 tokens a page in, ~2,000 tokens of structured fields out | $0.08 | $32 |
| Appetite check and draft outputs | Guide (~6,000 tokens, cached) plus the record; ~1,000 tokens out | $0.02 | $8 |
| Retries, edge-case reasoning, monitoring | 25% overhead | $0.03 | $10 |
| **Model cost** | | **$0.13** | **$50** |
| Hosting, queue, logs, secrets | Small managed service, same pattern we run | | $25 |
| Human review at the checkpoints | A: 40 samples × 5 min; B: 120 declines × 3 min in month one; C: unchanged | | ~9 hours, $315 |
| **Run cost, month one** | | | **≈ $390** |
| **Run cost, steady state** (B sampled at 1 in 5) | | | **≈ $190** |

Against the current **≈ $7,000 a month** in intake labour, the target state removes the keying
step and most of the decline handling. A conservative estimate keeps one intake FTE on review and
exceptions and redeploys three, or absorbs growth without hiring. Payback on a pilot at our
published price is inside the first quarter if even two of the four intake roles are redeployed.

The number most likely to be wrong is extraction accuracy on the loss-run formats; that is why
checkpoint A samples every tenth record until the measured accuracy is known.

## 6. First move

Before building anything: pick 20 recent submissions, run them through an extraction pass
against the written guide, and measure field accuracy and decline-match rate. This is a week of
work for the intake lead and costs under $10 in model usage. It settles the one score we are
least sure of (data accessibility) with a measurement instead of an opinion.

Owner: Head of Operations. Due: within the month.

## 7. Biggest risk

Treating an Advanced score as permission to skip the checkpoints. The guide is written, but the
packets are not, and an extraction error that reaches an underwriter as a clean record is the one
failure that erodes trust in the whole system. The sampling checkpoint is the price of the score.

The risk that we are wrong: our volume and cost figures are the client's, unverified; if the
real time per submission is nearer 20 minutes than 40, the labour saving halves and the case
rests on cycle time rather than cost. The 20-submission measurement in section 6 will show
which.

---

*One round of written questions from the client is included after delivery. Implementation is
a separate pilot, priced monthly, and offered only after this assessment.*
