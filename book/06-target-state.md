# 6. Designing the target state

*Draft.*

Design rules we hold to, to be expanded with worked examples:

- **Delete before you automate.** The cheapest step is one that no longer exists. Every step
  in the current state gets asked whether it exists for a reason or for a reason that expired.
- **Design the escalation path before the happy path.** The happy path is easy and gets
  attention naturally. What the system does when it cannot proceed is what determines whether
  people trust it, and it is what is always half-built.
- **One writer per artifact.** Two agents that can both modify the same record will eventually
  disagree, and debugging that costs more than the parallelism saved.
- **Instrument at the boundary.** Cost per run, escalation rate, error rate, and queue depth are
  the four numbers. If a redesign cannot produce them, it is not finished.
- **The human steps that remain must be worth a human.** If a person's role in the target state
  is to click approve on things they never reject, you have designed a rubber stamp. Either give
  them the information that would let them reject, or remove the checkpoint and say so.
