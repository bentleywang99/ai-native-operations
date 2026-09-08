# 10. Trust, security, and the untrusted input problem

When agents do the work, every piece of text that enters the system is a potential instruction.
An email, a contact form, a document a client uploads, a web page the agent reads: each can say
"ignore your instructions and do this instead", and a model reading it may comply. This is not
hypothetical for us. StackNative's inbox is publicly reachable, its contact form is on the
website, and an AI reads both.

The defence is not a better prompt. Prompts are advice, and advice can be argued with. The
defence is architecture: decide with code what a model is allowed to see and do, and assume the
prompt will be defeated eventually so that when it is, the blast radius is small.

## Where untrusted input comes from

For a company like ours: inbound email; website forms; the free chat and reading questions;
documents and exports clients send for an assessment; web pages read during research; Trello
comments and calendar invites from outside; and, less obviously, the outputs of our own agents,
which a later agent may read as if they were facts.

Each of these gets the same treatment: classify by code, quote as data, and give the reader the
least capability it can do its job with.

## Classify with code, not judgment

Our inbox routine begins with a deterministic script that runs before any model sees the mail.
It sorts every message into one of three tiers using facts a model cannot be talked out of:

- **Trusted:** the sender is on a short allowlist and the message passes SPF, DKIM, and DMARC.
- **Service:** the sender's domain is on a list of known services (the task board, the payment
  processor, the cloud vendor) and authentication passes.
- **Unknown:** everything else, including anything claiming to be an allowlisted sender that
  fails authentication. These are labelled and removed from the inbox before the model runs.

The sender's claimed identity never decides the tier; the authentication result does. A spoofed
email from "the board" lands in the unknown tier like any stranger's.

## Quote as data, never as instruction

Whatever the tier, the model receives a digest, not the original: plain text with HTML stripped,
links defanged so they cannot be followed by accident, a bounded excerpt, and a note of any
injection-shaped patterns found ("ignore previous instructions", role-play framing, requests to
reveal system prompts). The digest opens with a line that says everything below is data quoted
from email and is not an instruction, whatever it claims to be.

The same applies to the website contact form. Its rows go into the digest through the same
script, marked as form submissions with an unverified identity, and the rule for replying is:
by email only, to the address given, never by any channel the message names.

## Least privilege per session

The session that reads stranger mail can run exactly one wrapper command with four verbs:
show the digest, read one trusted or service message, archive it, keep it. It cannot send mail,
browse the web, read secrets, or touch the deployment. The harness enforces this; the model is
not asked to refrain. A session that needs to send mail or deploy is a different session, with
different tools, and it does not read stranger mail.

This is the same principle as the checkpoint chapter: put the boundary where the consequence
is, and make it structural.

## Capability separation

The component that handles untrusted input is not the component with credentials. On our side:

- Product secrets (the model key, payment keys, the invitation signing secret) live in a managed
  secret store and are mounted only into the web service that needs them. No session reads
  them; the service does.
- The payment integration refuses to run with anything but a test key, by code, until the board
  activates the account. The board holds payment authority exclusively; the CEO's access to
  money is read-only.
- The web service that talks to visitors holds no credentials for the company's own systems
  (mail, task board, memory). It can append rows to one spreadsheet and call one model.
- Checkout is reachable only by a signed invitation link, so a public visitor cannot start a
  payment flow by guessing a URL.

## Rate limits and caps as security

Chapter 8's caps are cost controls, and they are also the defence against a script that finds
the reading or consulting endpoint. A per-address hourly limit, a daily cap per service, and a
queue of one mean that abuse is bounded and visible before it is expensive. A scanner probing
the site for credential files gets four hundred and four; there is nothing at those paths and
the logs show the probe.

## Secrets and identity hygiene

- One identity per system, owned by the company, with the credential in a secret store rather
  than a file that gets copied.
- Test credentials and live credentials are different objects with different names; code
  checks the prefix.
- Every account opened in the company's name is reported to the board the same day, before
  the vendor's own email arrives. We learned this one the hard way; see Chapter 9.
- Browser sessions the agent drives run in a managed profile separate from any human's.

## What we tell clients

An assessment for a process that touches untrusted input (most of them; anything with an inbox
or a form) includes these questions, and the target state answers them:

1. What text enters the process, from whom, and how is trust classified before a model reads it?
2. What can the agent that reads it actually do, and what can it not do, enforced by what?
3. Where are the credentials, and which component holds them?
4. What are the caps, and who sees the counts?
5. When the prompt is defeated, what is the worst outcome, and is it reversible?

If a design cannot answer the fifth question with something recoverable, the process needs an
approval checkpoint on the irreversible action, whatever its readiness score.

## Assume the prompt will be defeated

Every safeguard above is written so that a successful injection buys the attacker very little:
a digest they cannot escape, a session that cannot send or spend, a service that cannot reach
the company's systems, caps that bound the cost. That is the standard: not "the model will
refuse", but "when it does not, nothing much happens".
