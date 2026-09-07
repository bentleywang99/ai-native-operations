# 8. Cost control and the economics of an agent

An agent's cost is not a licence fee. It is a meter that runs every time the agent thinks, and
the meter is attached to a thing that can be asked to think by anyone on the internet. Cost
control in an AI-native process is therefore two problems: knowing what a unit of work costs,
and making sure nobody can run the meter without producing a unit of work.

The numbers in this chapter are StackNative's own, measured in the first week of September 2026
on Claude Sonnet 5 at list price, $2 per million input tokens and $10 per million output tokens.
They will drift as models and prices change; the method will not.

## What a unit costs

| Unit of work | Tokens in / out | Cost | Notes |
|---|---|---|---|
| One card reading (three cards, ~250 words) | ~750 / ~500 | about $0.006 | Single call. The card draw is free; only the interpretation is paid. |
| One consulting turn | ~800–1,400 / ~100–300 | about $0.003–0.005 | Rises with transcript length; the system prompt is cached after the first turn. |
| One consulting read-out (the final turn) | ~1,500 / ~600 | about $0.009 | Six scores with evidence, target state, first move, risk. |
| One full free consultation (4–6 turns) | | about $0.02–0.03 | What the free tier costs us per visitor who finishes. |
| One regression run (8 scenarios, ~40 turns) | | about $0.28 | Run before every rubric or prompt change. |

Two things follow. The free tiers are cheap enough to give away without a login, and the thing
that protects the budget is not the per-unit price but the cap on units.

## Caps, not hopes

Every agent that faces the public runs behind three limits, all of which are configuration, none
of which depend on a person noticing a problem:

- **A hard monthly ceiling at the provider.** Our product workspace at the model vendor has a
  $200 per month spend limit that cannot be exceeded by any bug in our code. This is the limit
  that lets the board sleep. It is set in the vendor's console, not in ours.
- **A daily cap per service.** Readings stop at 200 a day, consulting at 300 turns a day. At
  the unit costs above, the worst day costs about $2.50. The visitor is told to come back
  tomorrow, in plain words.
- **A per-visitor limit.** Three readings an hour and one free reading a day per browser;
  sixteen consulting turns an hour per address. This is the limit that stops one person, or one
  script, from consuming the day's budget in a minute.

The caps are deliberately generous relative to real traffic and stingy relative to abuse. When a
cap trips on a real day, that is a good problem, and the fix is to raise it with a number in hand.

## One at a time

The single decision that did most for cost was structural: the reader and the consultant each
serve one visitor at a time, with a short queue, like a person with a line at the door. This is
the opposite of the reflex to scale, and it is right for a new service for three reasons.

1. The queue bounds spend by construction. Concurrency is one; the daily cap is the only other
   number that matters.
2. It makes load visible. A visitor who waits thirty seconds is a signal we can see in a log line
   before it is a bill we see at month end.
3. It matches the product. A reading that arrives after a shuffle and a cut feels considered;
   an instant one feels vended. The consultant, likewise, is one consultant.

When a queue is consistently full, that is the moment to add a second worker, and by then the
unit economics are measured rather than guessed.

## Where the money actually goes

Three lessons from the first week, each of which moved a number.

**Thinking shares the output budget.** Current models reason before they answer, and the
reasoning tokens count against the response cap. With a cap set for the visible answer alone, the
model occasionally spent it on thinking and returned nothing. The fix was a larger cap with a
retry when the reply is empty or truncated. The cost of the larger cap is zero when it is not
used; the cost of the bug was a blank screen.

**A longer prompt can be cheaper.** Our consulting prompt grew past the vendor's minimum for
prompt caching when we compiled the rubric into it. From that point the first turn writes the
cache and every later turn reads it at a tenth of the price. A short prompt that misses the
minimum is billed in full every time.

**Retries are cheap; silence is expensive.** A transient network failure once cost a visitor
their turn. One automatic retry costs a few cents a month across all traffic and removes the
class of failure. Every agent call now retries once on network errors and server overload.

## Instrumentation

You cannot control a cost you do not log per unit. Each reading and each consulting turn writes
one log line with tokens in, tokens out, cost at list price, the running count for the day, and
the queue depth. A status endpoint exposes the day's count and cost per service. The weekly
report to the board quotes those numbers against the ceilings, and the ledger records every
committed dollar of tooling separately from usage.

The rule for the board is simple. Two ceilings, $200 per month for the product's model usage and
$100 per month for tools; the CEO decides everything under them and reports monthly spend against
both; anything over them is an ask, not a decision.

## The pilot problem

The economics above are for services we run on our own systems. A pilot for a client, where the
agent touches their systems on their timeline, is different: the unit is not a call but a
process run, the volume is theirs, and the failure modes include their credentials and their
downtime. We price pilots monthly rather than per unit for that reason, and we do not sell one
before an assessment has measured the client's volume and error costs. Chapter 11 will record
what the first pilot actually cost, which is the number this chapter is missing.
