# 9. Failure modes

*Draft.*

Honest catalogue, to be filled from our own incidents rather than from imagination.

- **Silent degradation.** Output quality drifts without any error firing. Only sampling catches
  this, which is why Chapter 3 argues for sampling as the default checkpoint.
- **The rubber stamp.** A checkpoint exists, and the human approves everything because they lack
  the information or the time to do otherwise. Worse than no checkpoint: it manufactures
  assurance and moves liability onto someone who never really decided.
- **No by-hand fallback.** The honest cost of genuine redesign. When the system is down the work
  stops, because the manual process no longer exists and the people who knew it have moved on.
  Mitigations are real but partial, and clients deserve to hear this before they start.
- **The confident wrong answer.** Systems do not hedge the way people do. Distance from known
  cases is a better routing signal than stated confidence.
- **Cost runaway.** See Chapter 8. Usually a retry loop or a volume spike, discovered on a bill.
- **Ownership evaporation.** The sponsor changes role, and the process keeps running with nobody
  responsible for it. Every target state needs a named owner and a review cadence, or it becomes
  someone's inherited mystery.
