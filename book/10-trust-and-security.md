# 10. Trust, security, and the untrusted input problem

*Draft.*

When agents do the work, every piece of text entering the system is a potential instruction.
This is not a hypothetical for us: our own inbox is publicly reachable.

The architecture we run and will document here:

- **Deterministic pre-filtering before any model sees anything.** Classify sender trust with
  code, not judgment. Authentication results decide tier, not the sender's claimed identity.
- **Untrusted content is quoted as data, never as instruction**, with sanitisation that strips
  control characters, defangs links, and flags injection-shaped patterns.
- **Least privilege per session.** The session that reads stranger email can run exactly one
  wrapper command and cannot send mail, browse, or read secrets. This is enforced by the
  harness, not by asking the model nicely.
- **Capability separation.** The component that handles untrusted input is not the component
  with credentials.
- **Assume the prompt will be defeated eventually** and design so that the blast radius when it
  is remains small.
