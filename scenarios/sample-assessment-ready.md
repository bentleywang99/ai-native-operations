# Sample AI-run readiness assessment: a process that is ready, with checkpoints

**Client:** a physical therapy clinic, three locations, United States.
**Process assessed:** appointment scheduling and rescheduling.
**Prepared by:** StackNative, 26 September 2026. Method: The AI-Run Company v0.5, chapters 3 to 6.

*This is a published example of the $2,500 deliverable for a process that scores **Ready**, the
band where the rubric says: redesign this now, on its own, with checkpoints placed by chapter 3.
The business is a composite built from our regression scenarios, not a client, and its figures
are illustrative. The two other published examples show the ends of the scale:
[a submission intake that scores Advanced](sample-assessment.html) and
[a client onboarding that scores Early](sample-assessment-not-ready.html). This one is the
middle, which is where the interesting design decisions live.*

---

## 1. Scope

**Process.** A patient asks for an appointment or a change to one, by phone, and the front desk
books it against a clinician's calendar and the location's rules.

**Input artifact.** A phone call, or a voicemail returned by phone.

**Output artifact.** An appointment in the EHR, with the patient told when and where.

**Owner.** The office manager, who can approve changes to scheduling. Clinicians sign off on
any rule that touches clinical timing.

**Out of scope.** Clinical decisions themselves, billing and insurance authorisation, new-patient
intake paperwork, and anything the EHR vendor would have to build.

## 2. Current state

About 900 appointments a month across three locations. Front desk staff spend hours a day on the
phone, and a large share of the calls are reschedules of visits already booked.

Scheduling rules exist in writing at each location, and they differ between locations. Most
cases are routine: a follow-up visit at the usual cadence. A minority need a clinician's
judgment, the standing example being whether a post-surgical patient can safely wait another
week.

The EHR has an API. Access to it is controlled by the clinic's IT vendor, who grants it on
request and takes weeks. Patient records are protected health information under HIPAA.

A wrong routine booking produces an annoyed patient and a second call. A post-operative patient
booked too late can be harmed. Nobody has tried an AI tool on scheduling.

## 3. Scores

| Dimension | Score | Evidence |
|---|---|---|
| Decision clarity | 1 | The common cases are written down, per location; the edges (clinical timing) are judgment held by clinicians, and the three written procedures disagree with each other. |
| Data accessibility | 1 | An API exists but must be requested from the vendor and takes weeks. Reachable but awkward, and it has been granted before. |
| Volume and repetition | 2 | 900 a month, roughly 40 a working day, with recognisable recurring shapes: routine follow-up, reschedule, new referral. |
| Error tolerance | 1 | The typical error is cheap and reversible. The minority, clinical timing, is not, and that minority is named: it is where the approval checkpoint goes. |
| Existing structure | 1 | Recognised stages exist and are written, but differ by location, and nothing today would notice a skipped step. |
| Ownership | 1 | One owner who can decide, with clinicians' sign-off required on the clinical subset of the rules. |

**Total: 7 / 12. Readiness: Ready.** No capping rule applies: neither dimension 1 nor 6 is 0.

Two of these scores could be argued upward. Decision clarity could be a 2 once the three
procedures are reconciled into one; ownership could be a 2 if the clinicians delegate the
clinical rules in writing. We score what is true today, not what is planned, and when torn we
take the lower. Both are cheap to raise and both are in the first move.

## 4. Target state

**What agents do.**
- Take routine scheduling by text message: a patient asks to book or move a follow-up, the system
  offers slots that satisfy the written rules for that location and clinician, confirms, and
  writes the appointment to the EHR through its API.
- Classify every request on arrival into routine, reschedule, or *clinical-timing*, using a
  written list of triggers the clinicians own: post-operative status, a referral that names a
  window, a gap longer than the rule allows.
- Handle reschedules the same way, including the waitlist: when a slot opens, offer it to the
  patients whose rules it satisfies, in order.
- Hand the phone line back to people for everything else.

**Where humans stay.** Three checkpoints, in chapter 3's written form. One is an approval,
because the consequence is harm; the other two are cheap.

| Field | Checkpoint A: clinical timing (approval) | Checkpoint B: routine bookings (sampling) | Checkpoint C: cannot proceed (exception) |
|---|---|---|---|
| Trigger | Any request the classifier marks clinical-timing, and any post-operative patient regardless | 1 in 10 routine bookings in month one; 1 in 25 once the error rate is known | Patient not found, no slot inside the rule, ambiguous request, or the patient asks for a person |
| Who | The treating clinician, or the clinician on duty at that location | Front desk lead | Front desk, same as today |
| Sees | The request, the patient's last visit and plan, and the slot the system would have offered | The booking, the rule it satisfied, the conversation | The conversation so far and what the system could not resolve |
| Can do | Approve the slot, choose a different one, or call the patient | Confirm, correct, and add a note to the location's rule if the rule was wrong | Book by hand, exactly as now |
| If no response | Nothing is booked. After 2 working hours, escalates to the office manager, who calls the patient | The booking stands; sampling is after the fact | The patient is called back by a person within the hour, as now |

Checkpoint A is expensive on purpose. The rubric is explicit that a 0 or 1 on error tolerance
relocates the design toward approval checkpoints and raises the cost of the pilot, and this is
the case: a post-operative patient must never be booked by a system alone. The trade is stated
here rather than hidden in a score.

**What is measured.** Share of requests completed without a person; front-desk phone minutes
per day; reschedule lead time; clinical-timing requests per week and the clinician's response
time at checkpoint A; correction rate at checkpoint B; patient no-show rate, which the waitlist
should lower.

**What changes for the team.** The front desk stops being a call centre for routine moves and
becomes the place that handles the complicated cases and the patients who want a voice. The
clinicians gain a defined, small queue of timing decisions instead of interruptions.

## 5. Cost model

Assumptions are listed so they can be challenged. Model costs are at the vendor's list price
for a current mid-tier model, September 2026. Messaging is priced at a typical US carrier rate
for application-to-person texting.

| Item | Assumption | Per appointment | Per month (900) |
|---|---|---|---|
| Classification and slot offer | Rules for the location (~3,000 tokens, cached) plus the request; ~600 tokens out | $0.01 | $9 |
| Conversation to confirm | Three to five messages each way; ~2,000 tokens total | $0.01 | $9 |
| Retries, waitlist offers, monitoring | 30% overhead | $0.01 | $5 |
| **Model cost** | | **$0.03** | **$23** |
| Text messaging | ~6 messages per appointment at ~$0.01 each | $0.06 | $54 |
| Hosting, queue, logs, secrets, audit trail | Small managed service, same pattern we run; HIPAA needs the audit trail from day one | | $40 |
| Human review at the checkpoints | A: ~60 clinical-timing requests × 4 min; B: 90 samples × 2 min in month one; C: unchanged | | ~7 h |
| **Run cost, month one** | | | **≈ $120 plus 7 hours** |
| **Run cost, steady state** (B at 1 in 25) | | | **≈ $120 plus 5 hours** |

Against the current front-desk time, the case rests on hours, not headcount. If routine and
reschedule traffic is 70% of 900 requests and each takes six minutes of a person's time on the
phone, the target state returns about **60 hours a month** across three locations, which is a
front-desk role's worth of afternoons. The clinic keeps its staff and stops hiring for the phone.

**The number most likely to be wrong** is the 70% routine share. If clinical-timing requests are
nearer 30% than 10%, checkpoint A becomes the bottleneck, the clinicians' queue grows, and the
saving halves. The first move measures this before anything is built.

**Compliance is a cost line, not a footnote.** A business associate agreement with every vendor
in the path, an audit log of every booking the system makes, and no patient data in any prompt
beyond what the booking needs. We budget a week of the pilot for this and would not start without
it.

## 6. First move

Two things, in parallel, neither of which builds anything.

1. **Request the EHR API access today.** It takes weeks, it has been granted before, and every
   week it is not requested is a week added to the pilot. Owner: office manager. Due: the
   request sent this week.
2. **Classify 200 recent requests by hand.** Pull two weeks of scheduling calls from one
   location and tag each one routine, reschedule, or clinical-timing. This is a day of work for
   the front desk lead. It settles the 70% assumption, and the clinical-timing pile becomes the
   first draft of the clinicians' trigger list, which is the document that raises decision
   clarity to a 2.

Reconciling the three location procedures into one can wait for the pilot; the differences will
surface as checkpoint B corrections, which is cheaper than a meeting.

## 7. Biggest risk

Building the routine path before the clinicians have written the clinical-timing triggers. The
system would then classify a post-operative patient as routine because nothing told it
otherwise, and the approval checkpoint would never fire. The trigger list is not part of the
build; it is a precondition of switching the build on, and it is the clinicians' to write.

The risk that we are wrong: the API may be slower or narrower than the clinic believes. If the
vendor grants read access but not write, the system can offer slots but not book them, and the
design falls back to drafting the booking for a person to commit. That is still worth having,
and it is why the request goes out first.

---

*One round of written questions from the client is included after delivery. Implementation is
a separate pilot, priced monthly, and offered only after this assessment. For a Ready process
the pilot starts with the checkpoints, not the automation.*
