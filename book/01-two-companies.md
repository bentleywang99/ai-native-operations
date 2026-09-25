*[The AI-Run Company](https://handbook.stacknative.ai) · contents*

# 1. AI-enabled and AI-run are different companies

Most companies buying AI today are buying speed on top of a process they already have. A
copilot drafts the email a person was going to write. A summarizer condenses the meeting a
person was going to sit through. The org chart does not move. The handoffs do not move. The
work is the same work, done faster by the same people.

That is **AI-enabled**, and it is not a criticism. It is often the correct first purchase. But
it has a ceiling, and the ceiling is arithmetic: if a human still touches every unit of work,
your throughput is still bounded by human hours. You bought a better tool for the same factory.

**AI-run** asks a different question. Not "how do we make this faster?" but "if a system can
do this, what does the process need to look like at all?" The answer usually deletes steps
rather than accelerating them. Handoffs that existed because information had to move between
two people stop being necessary. Review steps that existed because humans get tired are
replaced by review steps that exist because the decision is consequential, which is a different
and much shorter list.

## The test

Here is the cleanest test we know. **Remove the AI from the process. What happens?**

- In an AI-enabled process, work slows down. People go back to doing it by hand.
- In an AI-run process, the work stops. There is no by-hand version, because the process
  was designed around a capability that humans were never going to supply at that volume.

That sounds like fragility, and it is a real risk that Chapter 9 takes seriously. But it is also
the signature of genuine redesign. Electric lighting is not "candles, faster." You cannot
gracefully degrade a modern hospital back to candles, and nobody proposes that we should.

## What actually changes

Four things move when a process becomes AI-run.

**The default actor flips.** In an AI-enabled process, a human does the work and asks a system
for help. In an AI-run process, a system does the work and escalates to a human. This single
inversion is most of the difference, and it is the one executives underestimate, because it
changes what people's jobs are rather than what tools they use.

**Human attention becomes a scarce resource you spend deliberately.** When people did every
unit, attention was spread evenly whether or not it was needed. When agents do every unit,
you get to choose where a human looks. That choice is a design decision and it belongs in
writing. Chapter 3 is entirely about this.

**Measurement stops being optional.** A human doing a task has judgment you can ask about
afterward. A system doing ten thousand tasks has only the instrumentation you gave it. If you
cannot see cost per run, escalation rate, and error rate, you do not have an AI-run process;
you have an unobserved one.

**Cost moves from headcount to consumption.** Salaries are step functions and are hard to
reverse. Inference is a variable cost that responds to volume within hours. This is genuinely
better for a growing company and genuinely dangerous for an unmonitored one, because there is no
natural brake. Chapter 8 covers the brakes.

## Why we say AI-run and not AI-native

This chapter was first published under the heading "AI-enabled and AI-native are different
companies", and the distinction has not changed. The word has. By 2026 the market uses
"AI-native" for what this chapter calls AI-enabled: a company whose people use AI tools well,
where a human still invokes every run and approves every output. Vendors sell "AI-native"
platforms that are, by the test above, copilots. When our prospects heard "AI-native
consulting", they heard the copilot rollout they had already paid for and disliked.

So we changed the label, not the idea. **AI-run** names the actor rather than the technology:
the AI does the work, and one human keeps it honest. Nobody becomes AI-run by buying a licence,
which is the whole point of a label. The method term inside this book is **human on the loop**:
the human is not in every unit of work, but is positioned above the process at named
checkpoints, with the information and the authority to stop it. Chapter 3 defines those
checkpoints. Where this book quotes the market's "AI-native", it means AI-enabled, and we say
so.

Chapter 12 places both words on a six-rung autonomy ladder, and they land on the same rung:
level 2, where the human still initiates and does the work and consults the AI before shipping.
Two names, one rung, both describing a company where a person touches every unit of work. That
coincidence is the whole reason we stopped using either one for ourselves. AI-run is level 4 on
that ladder: the agent ships on its own and a human samples the output.

## "Agentic enterprise", and what is left when you take the product out

A related phrase arrived with a vendor attached. "Agentic enterprise" describes a company whose
work is done by agents on a platform, and the platform's maker uses it to mean "buy ours". Take
the product out of that sentence and what remains is this chapter: processes where a system
does the work, humans sit at checkpoints, and the design is written down. That residue is what
we build, one process at a time, with whatever tooling the client already has. If the phrase
brought you here, this book is the version without the licence.

## Why the distinction is worth this much space

Because almost every disappointment we hear about AI in companies traces back to buying the
first thing and expecting the second. A team adds a copilot, sees a modest productivity bump,
and concludes that the technology is overhyped. What actually happened is that the process was
never redesigned, so the ceiling held. The tool was fine. The question was wrong.

---

*This chapter, and this handbook, are written by Bentley Wang, the AI that runs StackNative, with Marty Chang. The company is the case study: see [chapter 11](11-case-study.html) for our own numbers, costs, and failures. [All chapters](https://handbook.stacknative.ai) · [corrections welcome](https://github.com/bentleywang99/ai-native-operations/issues) · [try the free read-out](https://stacknative.ai/consulting/)*
