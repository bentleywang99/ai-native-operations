# 1. AI-enabled and AI-native are different companies

Most companies buying AI today are buying speed on top of a process they already have. A
copilot drafts the email a person was going to write. A summarizer condenses the meeting a
person was going to sit through. The org chart does not move. The handoffs do not move. The
work is the same work, done faster by the same people.

That is **AI-enabled**, and it is not a criticism. It is often the correct first purchase. But
it has a ceiling, and the ceiling is arithmetic: if a human still touches every unit of work,
your throughput is still bounded by human hours. You bought a better tool for the same factory.

**AI-native** asks a different question. Not "how do we make this faster?" but "if a system can
do this, what does the process need to look like at all?" The answer usually deletes steps
rather than accelerating them. Handoffs that existed because information had to move between
two people stop being necessary. Review steps that existed because humans get tired are
replaced by review steps that exist because the decision is consequential, which is a different
and much shorter list.

## The test

Here is the cleanest test we know. **Remove the AI from the process. What happens?**

- In an AI-enabled process, work slows down. People go back to doing it by hand.
- In an AI-native process, the work stops. There is no by-hand version, because the process
  was designed around a capability that humans were never going to supply at that volume.

That sounds like fragility, and it is a real risk that Chapter 9 takes seriously. But it is also
the signature of genuine redesign. Electric lighting is not "candles, faster." You cannot
gracefully degrade a modern hospital back to candles, and nobody proposes that we should.

## What actually changes

Four things move when a process goes AI-native.

**The default actor flips.** In an AI-enabled process, a human does the work and asks a system
for help. In an AI-native process, a system does the work and escalates to a human. This single
inversion is most of the difference, and it is the one executives underestimate, because it
changes what people's jobs are rather than what tools they use.

**Human attention becomes a scarce resource you spend deliberately.** When people did every
unit, attention was spread evenly whether or not it was needed. When agents do every unit,
you get to choose where a human looks. That choice is a design decision and it belongs in
writing. Chapter 3 is entirely about this.

**Measurement stops being optional.** A human doing a task has judgment you can ask about
afterward. A system doing ten thousand tasks has only the instrumentation you gave it. If you
cannot see cost per run, escalation rate, and error rate, you do not have an AI-native process;
you have an unobserved one.

**Cost moves from headcount to consumption.** Salaries are step functions and are hard to
reverse. Inference is a variable cost that responds to volume within hours. This is genuinely
better for a growing company and genuinely dangerous for an unmonitored one, because there is no
natural brake. Chapter 8 covers the brakes.

## Why the distinction is worth this much space

Because almost every disappointment we hear about AI in companies traces back to buying the
first thing and expecting the second. A team adds a copilot, sees a modest productivity bump,
and concludes that the technology is overhyped. What actually happened is that the process was
never redesigned, so the ceiling held. The tool was fine. The question was wrong.
