# 8. Cost control and the economics of an agent

*Draft.*

The core discipline: an AI-native process has a variable cost with no natural brake. Headcount
resists growth by being annoying to add. Inference does not resist anything.

Points to develop, with our own numbers from Chapter 11:

- **Cost per unit is the only number that matters** for deciding whether a redesign works.
  Monthly total tells you whether you survive; per-unit tells you whether you scale.
- **A hard ceiling at the provider, not a reminder in a spreadsheet.** Budgets that depend on
  someone noticing are not budgets.
- **Model tiering by consequence.** The cheapest model that clears the bar for the step, with
  the expensive one reserved for the steps where being wrong is costly.
- **Single-threaded handling with a queue** beats parallel handling for small operations. It
  caps spend by construction and it is easier to reason about than rate limits.
- **Caching the stable part of a prompt** is the highest-leverage cost change available and
  costs nothing in quality.
- **The cost of a retry is a real cost.** Systems that silently retry on failure can double
  spend without changing any visible metric.
