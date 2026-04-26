# Conway's Law in Product Design

> **Organizations tend to produce designs which are copies of the communication structures of these organizations.**

Conway's Law was introduced in 1967 by programmer Melvin Conway. The law represents a concept originating from the software world but not constrained by any specific domain. Conway's law was not intended as a joke but as a valid sociological observation. It states the fact that two software modules X and Y cannot interface correctly with each other unless the designer and implementer of X communicates with the designer and implementer of Y.

---

## The Core Concept

```
Organization ──── Produces a software ────> Software
                  mirroring its structure

  [Team A]                                   [Module A]
  [Team B]                                   [Module B]
  [Team C]                                   [Module C]
```

The way teams are structured and communicate directly shapes the architecture and user experience of the product they build.

---

## How Does It Apply to User Experience?

Organizations often produce websites with a content and structure which mirrors the internal concerns of the organization rather than the needs of the users of the site.

### Simple Example

**User-centric form:**

```
Contact Us
├── Name
├── E-mail
├── Message
└── [Submit]
```

3 fields. Asks only what's needed. Respects the user's time.

**Organization-centric form:**

```
Contact Us
├── First Name    │ Last Name
├── E-mail        │ Phone
├── Address
├── ZIP           │ Country
├── Message
├── Terms and conditions
├── ☐ Agree with terms and conditions
├── ☐ Receive news
└── [Submit]
```

9+ fields. Structured around internal database schema and legal/marketing requirements, not user goals.

---

## Practical Tips

- Set up clear communication channels between different parts of your organization to ensure that every team has the same shared understanding of the user problems you're trying to solve.
- Strive to align leadership's and stakeholder's vision with user needs and mental models.
- Validate early designs and product prototypes with your users to make sure your product meets their expectations and solves their problems.
- Communicate as early as possible the Information Architecture of your product's UI.

---

## Tags

`conway's law` `organizational design` `information architecture` `team structure` `ux strategy` `product design`
