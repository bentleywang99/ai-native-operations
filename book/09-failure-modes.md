# 9. Failure modes

This is a catalogue of the ways an AI-native process fails, written from our own incidents in
the first week of running one rather than from imagination. Each entry has the shape of the
failure, the case where we met it, and the design that now prevents it. The general lesson
comes first because it recurs in every entry: the failure is almost never the model being
wrong; it is the system around the model being silent.

## 1. Silent degradation

**Shape.** Output quality drifts and no error fires. A prompt change, a model update, a data
source that changed format: the process keeps producing, and what it produces is a little worse
each week.

**Our case.** The consulting read-out's scores moved by a point per dimension between runs
before we had any way to see it. Nothing was broken; the verdicts were merely inconsistent.

**Design.** A regression set with expected outcomes, run before every change and on a schedule.
Ours is eight fictional businesses with expected readiness bands; a change that flips a band
fails the build. Sampling checkpoints in a client's process do the same job for their outputs,
which is why Chapter 3 makes sampling the default.

## 2. The rubber stamp

**Shape.** A checkpoint exists and the person approves everything, because they lack the
information or the time to do otherwise. Worse than no checkpoint: it manufactures assurance and
moves responsibility onto someone who never decided.

**Our case.** In the proposals scenario the solutions engineer "reviews every one" and changes
one in five. The other four are a stamp that costs an hour each.

**Design.** Chapter 6's fifth rule. Show the reviewer what they would need to reject (source
beside output, confidence flags, the rule applied), or remove the checkpoint and say so. Measure
the overturn rate; a checkpoint with a zero overturn rate for a month is a stamp.

## 3. The empty answer

**Shape.** The model returns nothing, or a truncated answer, and the surrounding code treats
that as success.

**Our case.** Current models reason before they answer, and the reasoning tokens count against
the response cap. Our cap was sized for the visible answer; on some turns the model spent it on
thinking and the visitor got a blank reply. The queue logged "ok".

**Design.** A larger cap, one retry when the reply is empty or the stop reason is the cap, and
a log line that records the stop reason. More generally: define what a bad answer looks like and
check for it, because the API will not.

## 4. The confident wrong guess

**Shape.** Asked who or what caused something, the system names the likeliest actor instead of
saying it does not know. The guess is stated in the voice of a finding and gets acted on.

**Our case.** A Stripe account-verification email arrived while a shift was creating that very
account. A separate inbox session checked the completed shift logs, found no Stripe work, and
told the board it was "most likely" the board's own doing. The board, who knew they had not
touched Stripe, concluded it was phishing and was minutes from reporting a legitimate account.
The shift that created it had not finished, so its work was not yet in any log.

**Design.** Attribution is a claim that needs evidence; "origin unknown" is a complete answer.
Before concluding that no session did something, check for sessions in flight. Announce every
account, key, and subscription opened in the company's name in the same report, before anyone
finds it in their inbox. And never recommend a destructive action (report, delete, revoke)
without verifying the target first.

## 5. The self-inflicted outage

**Shape.** The process restarts, redeploys, or reconfigures the thing it is running inside.

**Our case.** A session restarted the gateway that hosts sessions, from inside a session,
killing itself mid-task with no reply and no record. Later, a graceful restart that waited for
the model to finish but not for the reply to be delivered lost two messages.

**Design.** Restarts are requested, not performed: the session asks the host to restart after
draining, and the host resumes any turn it interrupted from an on-disk record of in-flight
work. "Done" means delivered, not generated.

## 6. The stale cache

**Shape.** A change is deployed, verified with a tool that has the old version cached, and
judged to have had no effect. Two more changes follow before anyone notices.

**Our case.** Static assets were served with a one-hour cache. Two iterations of the card
renderer appeared to do nothing because the test browser kept the old script.

**Design.** Version every asset reference and bump it on change. Verify by content (a marker in
the page, a hash), never by status code. The same lesson bit us in the DNS incident below.

## 7. Infrastructure with a memory

**Shape.** A configuration change that is correct in isolation fails because something upstream
remembers the old state.

**Our case.** Switching the domain's nameservers while the registry still published a DNSSEC
signing record for the old provider. Every validating resolver returned failure for every
record, including mail, for forty minutes. Locally the site looked fine, because the local
resolver did not validate and had the old answers cached, and we said so to the board before
checking the page content.

**Design.** Before any change with a parent (DNS delegation, certificates, OAuth clients, DNS
signing), read the parent's current state first. Verify from outside your own cache, from the
resolvers real visitors use. Report what was verified and how, not what was assumed.

## 8. Expiring credentials

**Shape.** A credential that worked yesterday expires under a policy nobody set, and the failure
surfaces as a broken deploy or a silent skipped job.

**Our case.** Google Workspace re-authentication policy expired both the mail credential and the
cloud credential within the same day. One broke a deploy quietly; the other stopped the inbox
routine.

**Design.** Detect expiry explicitly (a token check before each job), self-heal where possible
(our deploy script re-authenticates through a browser it controls), and make the routine that
depends on a credential report when it could not run rather than run with nothing to say.

## 9. Cost runaway

**Shape.** A retry loop, a volume spike, or a scraper discovers the endpoint. Found on a bill.

**Our case.** None yet, and that is the point of Chapter 8: three caps set before the first
visitor, a hard ceiling at the vendor, and a queue of one.

**Design.** Caps before traffic. A single meter per unit of work. A daily count exposed on a
status endpoint that a person looks at.

## 10. No by-hand fallback

**Shape.** The honest cost of genuine redesign. When the system is down, the work stops,
because the manual process no longer exists and the people who knew it have moved on.

**Our case.** Our own operations. If the gateway and the memory files are unavailable, the
company does not run; there is no manual version of an AI CEO.

**Design.** Partial mitigations, stated plainly to clients: keep the written rule set current so
a person could follow it; keep the human checkpoints staffed by people who still understand the
work; rehearse the fallback once a quarter. And tell the client that the fallback is slower than
the old process, because it is.

## 11. Ownership evaporation

**Shape.** The sponsor changes role and the process keeps running with nobody responsible. It
becomes an inherited mystery that nobody dares switch off.

**Our case.** The nonprofit in our regression set, scored Early because its owner was leaving
with no successor. The rubric caps ownership at zero for exactly this.

**Design.** A named owner in the assessment's scope, a review cadence in the target state, and
the four boundary measurements delivered to that person weekly. When the name changes, the
assessment is reopened.

## What these have in common

Ten of the eleven are the system being quiet: no error on the empty answer, no signal on the
drift, no record of the killed session, a cached success where there was a failure. The design
response is the same every time: define what wrong looks like, check for it in code, and make
the check's result visible to a named person. The model is the least of it.
