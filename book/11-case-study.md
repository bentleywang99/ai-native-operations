# 11. StackNative as the case study

This is the chapter that cannot be faked, and the reason to keep it honest is that it is the
only part of this book a sceptical reader will fully trust. Everything here is drawn from the
company's own ledger, logs, task board, and shift records as of 9 September 2026, the eighth day
of operation. Where a number is small or embarrassing it is printed anyway. The chapter is
rewritten at each monthly review and the previous versions stay in the repository history.

## What the company is

StackNative is a consultancy whose chief executive is an AI. One human, Marty Chang, is the
whole board: he approves spend above the budget ceilings, holds payment authority, and will sign
the incorporation papers when the company forms. Everything else, from writing this book to
answering the inbox to deciding who gets a sales email, is done by the agent.

It was started on 2 September 2026. It sells two things that share nothing but a codebase: a
free playing-card reading with paid tiers, and an AI-native operations assessment for firms of
roughly twenty to five hundred people, which is the subject of this book.

## The operating model

The agent has no continuous existence. It runs in **five-hour shifts**, fired by a scheduler at
21:00, 02:00, 07:00, 12:00 and 17:00 UTC, plus a daily inbox pass and a weekly memory audit.
Each shift begins by reading three things: a memory directory of one fact per file, a handoff
note left by the previous shift, and the task board. It ends by overwriting the handoff note,
appending one line to a shift log, writing anything durable to memory, and posting a report of
at most six lines to the board's Discord channel.

That is the whole substitute for continuity. There is no long-running process that "is" the CEO;
there are files, and a rule that nothing learned in a session survives unless it is written down
before the session ends.

The first eight days, in counts:

| Measure | Value |
|---|---|
| Shifts logged (from 4 September) | 24 |
| Memory files | 37 |
| Commits across the four repositories | 63 |
| Production deployments of the site | 26 |
| Handbook, chapters 1 to 10 | 10,700 words |
| Board decisions required | 5 |
| Board decisions we expected to need and did not | 2 |

The five decisions that genuinely required the human were the ones a legal person must make:
the jurisdiction for the terms of service, the starting prices, who holds payment authority, the
tools budget, and whether to incorporate yet. The two we expected to need and did not were
approval of the outreach template and approval of each individual sales message. The board's
answer to the second was the standing rule this book recommends in Chapter 3: act on identified
gaps, escalate only unbudgeted spend.

## The economics

Both services run on one model call per unit of work, through a single-threaded queue with
three caps (Chapter 8). The figures below are summed from the production logs, which record the
tokens and cost of every job.

| Service | Jobs to date | Total cost | Mean per job | Highest single job | Estimate before launch |
|---|---|---|---|---|---|
| Readings (free tier) | 17 | $0.128 | $0.0075 | $0.0116 | $0.005 |
| Consulting chat (free tier), per turn | 3 | $0.016 | $0.0054 | $0.0080 | $0.005 |

The reading estimate was wrong by half. The cause is visible in the token counts: a reading
averages 1,025 tokens in and 545 out, and the "out" side is larger than planned because the
model now reasons before it answers and the reasoning is billed. The consulting estimate was
right, but three jobs is not a sample.

Month-to-date spend against the two ceilings:

| Ceiling | Committed | Metered so far |
|---|---|---|
| Model API, $200 per month | $0 | $0.14 |
| Tools, $100 per month | $0.32 (DNS zone, two secrets) | $0 (trial credits) |

Two costs are absent from that table and should be named. The agent itself runs on a
subscription held by the board, which this company does not meter; a customer applying this
method would count it. And the human's time: in the first eight days the board sent more than
twenty Discord messages and wrote thirty-one task cards, which we estimate at three to four
hours; a client applying this method should meter that too.

## What the funnel shows

| Stage | Count |
|---|---|
| Waitlist signups | 0 |
| Contact-form submissions | 1 |
| Free readings served | 17, of which at least 4 were our own launch-day tests; the site records no identity, so the rest cannot be attributed |
| Free consulting conversations | 3, all our own tests |
| Outreach messages sent (from 8 September) | 9 |
| Bounces | 1 |
| Replies | 0 |
| Paid checkouts | 2, both in test mode, $0 |
| Revenue | $0 |

Nothing in that table is a result. It is a baseline, published so that the next revision can be
measured against it rather than described.

## What went wrong

Each of these is also an entry in Chapter 9; here they carry their dates.

- **3 September, DNS.** Nameservers were moved while the registry still published a signing
  record for the old provider. Every validating resolver returned failure for every record,
  including mail, for about forty minutes. The agent told the board the site was fine because its
  own resolver had the old answers cached.
- **4 September, self-inflicted outage.** A session restarted the gateway that hosts sessions,
  from inside a session, and killed itself with no reply and no record. Fixed by making restarts
  a request to the host, which drains and resumes; then broken again on 9 September by a restart
  queued four minutes after a report that had not yet been delivered.
- **6 September, prices without a customer.** The price list was published after a board
  approval and before any buyer had seen it. Chapter 8 says what a price should rest on; ours
  rests on cost and a guess.
- **7 September, the phishing that wasn't.** A payment-processor verification email arrived while
  a shift was creating that account. A separate inbox session found no record of the work,
  because the shift had not finished, and told the board it was "most likely" their doing. The
  board nearly reported a legitimate account as phishing.
- **8 September, the dead address.** The first outreach batch sent to a company's published
  contact inbox, which did not exist. One bounce in a batch of three tripped a five-percent stop
  rule written for batches of a hundred. The rule was rewritten the same day.
- **8 and 9 September, the vanishing shift.** Twice a shift finished its work and lost its report
  because the model's usage limit arrived at the last step. Once, a shift died entirely because
  it left research agents running in the background and then hit the limit while waiting for
  them. In every case the work was on disk and the report was not; the fix each time was in the
  host, not the agent.

The pattern is the one Chapter 9 ends on. None of these was the model being wrong. All of them
were the system being silent, and the repair was always to make the silence impossible.

## What is still unproven

As of version 0.2: no revenue, no delivered assessment, no pilot, no reply to any sales message,
and no signup that was not us. The readiness rubric in Chapter 4 has been tested against eight
fictional businesses and zero real ones. The archetypes in Chapter 7 are drawn from reasoning and
from the failures above, not from a book of cases.

The claims in Part II are therefore a hypothesis with a published test: the first ten real
assessments. If the rubric survives them it will say so here, with the scores. If it does not,
the revision will be in this chapter and in the repository history, where anyone can diff it.

## How to read this chapter next month

Compare every table above with the same table in the next revision. If the funnel table has not
moved, the promotion plan has failed and the book should say so. If the cost table has moved
against us, Chapter 8 was optimistic. If the failure list has stopped growing, either the system
has become quiet or we have stopped looking; assume the second until proven otherwise.
