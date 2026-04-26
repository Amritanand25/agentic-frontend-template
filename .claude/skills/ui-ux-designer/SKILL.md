---
name: ui-ux-designer
description: UX researcher mindset for feature design — applies UX laws, cognitive biases, heuristics, accessibility, and design principles before building any UI. Use when planning features, evaluating designs, or making UX decisions. Thinks like a real designer before code is written.
allowed-tools: Read Grep Glob
---

# UI/UX Designer

> Think like a UX researcher before writing code. Every feature decision passes through user psychology, design principles, and measurable outcomes.

Work through these 8 phases in order. Skip a phase only when the answer is obvious. Output a UX Decision Summary at the end.

---

## Phase 1: Empathize & Define

Before designing anything, understand the user and define the problem clearly.

### Empathy Map

| Quadrant         | Ask                                                                   |
| ---------------- | --------------------------------------------------------------------- |
| **Think & Feel** | What are their goals, fears, frustrations with this task?             |
| **See**          | What other solutions have they seen? What's their reference point?   |
| **Hear**         | What do peers/stakeholders say about this kind of feature?           |
| **Pains**        | What obstacles or friction will they hit?                            |
| **Gains**        | What does success look like for them?                                |

### Journey Position

| Stage         | User Mindset                                            | Design Implication                          |
| ------------- | ------------------------------------------------------- | ------------------------------------------- |
| Awareness     | Discovering — needs clarity, not complexity             | Simple, scannable, zero learning curve      |
| Consideration | Evaluating — needs trust signals, comparison ability    | Social proof, clear value props, easy compare |
| Acquisition   | Committing — needs confidence, easy onboarding          | Minimal form fields, smart defaults, guidance |
| Service       | Using daily — needs efficiency, minimal friction        | Shortcuts, batch actions, keyboard nav       |
| Loyalty       | Power user — needs depth, customization                 | Advanced filters, saved preferences, export  |

### Apply Occam's Razor

> *"Plurality should not be posited without necessity."* — The simplest solution with fewest assumptions is usually correct.

- What is the **simplest** solution that solves this problem?
- Can we **remove** anything without losing value?
- Every additional field, button, step, or screen must justify its existence
- If users need to "learn" the UI, it's too complex

### Set SMART Goals

| S — Specific   | What exactly will this feature accomplish?                |
| -------------- | --------------------------------------------------------- |
| M — Measurable | How will we know it succeeded? (number, rate, score)      |
| A — Actionable | What concrete steps achieve this?                         |
| R — Relevant   | Does this align with user needs AND business goals?       |
| T — Trackable  | What metrics will we monitor post-launch?                 |

**Output:** `"[User type] needs [capability] so they can [outcome]. Success = [metric]."` One sentence.

---

## Phase 2: Compose the Layout (Design Principles)

Apply visual design principles to create a layout that communicates clearly.

### 7 Design Principles — Gestalt-Based

These rules come from Gestalt psychologists (early 20th century Austria/Germany). Evaluate your design against each:

| Principle              | Rule                                                                      | Fail Signal                                        |
| ---------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| **Emphasis/Dominance** | Create a focal point that draws attention first                           | User doesn't know where to look                   |
| **Unity/Rhythm**       | Repeat consistent spacing, colors, component styles                       | Layout feels random or disjointed                  |
| **Hierarchy**          | Arrange by importance: size, font, color, position (top-left reads first) | User can't scan in intended order                  |
| **Balance**            | Distribute visual weight evenly (symmetrical = stable, asymmetrical = dynamic) | One side feels "heavy"                            |
| **Proportion/Scale**   | Size differences must communicate meaning, not be arbitrary               | Elements are sized randomly                        |
| **Contrast**           | Differentiate interactive from static using color, shape, size            | CTAs blend into content                            |
| **Similarity**         | Same-function elements share visual traits (all filter pills look alike)  | User can't tell which elements are related         |

### 6 Gestalt Grouping Laws

| Law              | Effect                                                                   | UI Application                                     |
| ---------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| **Good Figure**  | Grouped objects → perceived as single figure (tendency to simplify)      | Cards with icon+title+desc = one unit              |
| **Proximity**    | Close objects → perceived as grouped                                     | Label near input = related. Gap between sections = separate |
| **Similarity**   | Similar objects → perceived as same group                                | All action buttons share same style                |
| **Continuation** | Intersecting objects → perceived as uninterrupted                        | Breadcrumbs, progress bars, timelines              |
| **Closure**      | Incomplete shapes → brain completes them                                 | Loading spinners, partially visible cards          |
| **Symmetry**     | Objects → perceived as symmetrical around center                         | Equal-width columns, centered modals               |

### Typography Hierarchy

Content must scan in this priority order:

```
Page Title (2XL, weight 600)
  └─ Section Heading (XL/L)
       └─ Primary Data/KPIs (M, primary color)
            └─ Supporting Content (M/L, default)
                 └─ Metadata/Labels (S, subdued-1)
                      └─ Tertiary Info (XS, subdued-2)
```

**Typography rules:** Body text ≥ 14px. Line height 1.4-1.6x. Max line length 60-80 chars. Heading hierarchy = size + weight decreasing with depth. Never skip heading levels. Adjust leading/tracking for legibility. Pair serifs with sans-serifs for contrast.

**Output:** Note any principle violations and fixes.

---

## Phase 3: Verify Usability (Heuristics + Fitts's Law)

### Nielsen's 10 Usability Heuristics (Jakob Nielsen, 1994)

For every screen/flow, verify:

| #  | Heuristic                     | Verify                                                         |
| -- | ----------------------------- | -------------------------------------------------------------- |
| 1  | **System status visibility**  | Loading states, progress bars, success/error feedback shown?   |
| 2  | **Real-world match**          | User's language used, not internal jargon or DB field names?   |
| 3  | **User control & freedom**    | Undo, back, escape, cancel always available?                   |
| 4  | **Consistency & standards**   | Same patterns as rest of app + platform conventions?           |
| 5  | **Error prevention**          | Confirmation before destructive actions? Validation on input?  |
| 6  | **Recognition > recall**      | Options visible, not hidden behind memory? Recent items shown? |
| 7  | **Flexibility & efficiency**  | Shortcuts for power users? Keyboard nav? Batch operations?     |
| 8  | **Minimalist design**         | Every element necessary? Can anything be removed?              |
| 9  | **Error recovery**            | Error messages: plain language + identify problem + suggest fix? |
| 10 | **Help & documentation**      | Tooltips, onboarding, contextual help for complex flows?       |

**Use as rules of thumb, not strict guidelines.** Run each design concept through them to reveal issues.

### Fitts's Law (Paul Fitts, 1954)

> *Time to reach a target = function of distance / size.* Closer + larger = faster to interact with.

| Check                              | Rule                                                          |
| ---------------------------------- | ------------------------------------------------------------- |
| **Target size**                    | Buttons ≥ 40px height, touch targets ≥ 48px                  |
| **Distance**                       | Related actions close together (Save/Cancel grouped)          |
| **Clickable area**                 | Checkbox/radio + label = entire clickable area                |
| **Prime pixel**                    | Most important element near user's current focus point        |
| **Magic pixels (far corners)**     | Don't put critical actions in far corners of the screen       |
| **Edge advantage**                 | Screen edges/corners are faster to reach (pinning action)     |
| **Spacing for error prevention**   | Destructive actions separated from safe ones                  |

**Output:** List heuristic violations with severity (critical/major/minor).

---

## Phase 4: Check Cognitive Biases (Psychology)

### 6 Biases That Affect UI Decisions

| Bias                   | What Happens                                                         | Mitigation                                                |
| ---------------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| **Framing Effect**     | Same data framed differently → different user conclusions. "40% clicked" vs "60% dropped off" | Test both positive and negative framings of key data      |
| **Backfire Effect**    | Users reject facts contradicting their beliefs, hold stronger to wrong mental models | Don't force — guide through transition, show evidence gradually |
| **Anchoring Bias**     | First number/option shown disproportionately influences all subsequent judgment | Be intentional about defaults, first items, reference prices |
| **Contrast Effect**    | Adjacent elements change perception of each other (same color looks different on different backgrounds) | Test elements in isolation AND in context                  |
| **Decoy Effect**       | A third "decoy" option manipulates preference between two real options | Use ethically — never dark-pattern users                  |
| **Ambiguity Effect**   | Users choose options with known outcomes over unknown ones           | Provide clear info, reviews, social proof for all options  |

### Baby Duck Syndrome (Konrad Lorenz — Imprinting)

> Users "imprint" on the first interface they learn and judge all changes against it. Even objectively better designs get rejected because they feel different.

**When redesigning:**
- Introduce changes **incrementally**, not all at once
- Let the UI **communicate** the change (tooltips, "what's new") rather than force it
- Be certain changes are **worth the user resistance**
- Run user testing to observe perception of new vs old
- Listen to users — negative feedback post-launch ≠ bad design, it may be imprinting bias

### Law of the Hammer (Abraham Maslow, 1966)

> *"If the only tool you have is a hammer, you tend to treat everything as if it were a nail."*

**Self-check before every design decision:**
- Am I using this UI pattern because it's **right for this problem**, or because it's **familiar**?
- Have I considered a fundamentally **different approach**?
- Is this design **user-centric** or **pattern-centric**?
- Am I letting the design system dictate UX instead of user needs dictating the design system?

**Output:** Identify biases in your decisions and how to address them.

---

## Phase 5: Ensure Accessibility (POUR + WCAG 2.1)

> 1 in 4 adults has a disability. 1 in 12 men is color blind. Accessibility is not a feature — it's a permanent mindset. Non-compliance carries legal risk.

### POUR Principles (W3C Foundation)

| Principle          | Requirement                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **P**erceivable    | Text alternatives for non-text content. Captions for media. Color contrast ≥ 4.5:1. Content resizable to 200%. |
| **O**perable       | Full keyboard navigation. No keyboard traps. No flashing content (< 3 flashes/sec). Touch targets ≥ 48px. Enough time to read/interact. |
| **U**nderstandable | Clear language. Predictable navigation (consistent across pages). Helpful error messages that identify field + suggest fix. Page language declared. |
| **R**obust         | Valid HTML. Semantic elements. ARIA roles where needed. Works with screen readers + assistive tech. |

### WCAG 2.1 — Key Criteria by Level

| Level  | Conformance | Must-Have Criteria                                                    |
| ------ | ----------- | --------------------------------------------------------------------- |
| **A**  | Minimum     | Non-text alternatives, keyboard accessible, no traps, captions, meaningful sequence, focus order |
| **AA** | Standard    | Contrast 4.5:1, resize text, consistent navigation, error suggestions, input purpose, orientation, text spacing |
| **AAA**| Aspirational| Enhanced contrast 7:1, sign language, no timing, reading level, pronunciation |

**Target AA for production.** A is non-negotiable baseline.

### Quick Checklist

- [ ] Color is never the ONLY indicator (pair with icons/text)
- [ ] All interactive elements keyboard accessible (Tab, Enter, Space, Escape)
- [ ] Focus order matches visual order
- [ ] Headings follow h1 → h2 → h3 (no skipping)
- [ ] Form fields have visible labels (not just placeholders)
- [ ] Error messages identify the field AND suggest a fix
- [ ] Text alternatives reflect semantic purpose ("search" not "magnifying glass")
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Touch targets ≥ 48px, gesture actions also available via UI controls
- [ ] Page language defined (`lang` attribute)

**Output:** List accessibility gaps and required fixes.

---

## Phase 6: Define Success Metrics (Measurement)

### HEART Framework (Google)

| Category          | Goal                   | Signal                                         | Metric                                         |
| ----------------- | ---------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **H**appiness     | User satisfaction      | Survey feedback, interviews                    | Satisfaction rating, NPS                       |
| **E**ngagement    | Content discovery      | Time in app, interactions                      | Shares, session length, page views             |
| **A**doption      | User onboarding        | Downloads, registrations, new feature usage    | Download rate, registration rate, feature adoption |
| **R**etention     | User loyalty           | Returning users, subscription renewals         | Renewal rate, churn rate                       |
| **T**ask success  | Goal completion        | Usability studies, behavior analytics          | Task completion rate, time on task             |

### Measurement Tools

| Tool    | What It Measures                    | Scale    | Benchmark          | When                          |
| ------- | ----------------------------------- | -------- | ------------------- | ----------------------------- |
| **SUS** | Overall perceived usability         | 0-100    | Average = 68. A = 80.3+, F = ≤51 | Post-launch, 10 Likert questions |
| **SEQ** | Per-task ease                       | 1-7      | Compare across tasks | Right after each task attempt |
| **NPS** | Recommendation likelihood           | -100 to +100 | Promoters(9-10) - Detractors(0-6) | Periodically or post-study   |

### Define Before Building

| Question                     | Answer Required                                |
| ---------------------------- | ---------------------------------------------- |
| What does success look like? | Specific outcome                               |
| How will we measure it?     | Metric + tool (SUS/SEQ/NPS/analytics)          |
| What's the baseline?        | Current state or industry average              |
| When will we evaluate?      | Timeline (1 week, 1 month, 1 quarter)          |

**Output:** 1-2 key metrics this feature will be measured against.

---

## Phase 7: Plan for Implementation (Team Alignment)

### Conway's Law Check (Melvin Conway, 1967)

> *Organizations produce designs that mirror their communication structures.*

- Is this design shaped by **user needs** or by **team structure**?
- Would the information architecture change if the org was structured differently?
- Are we building a **user-centric** form (Name, Email, Message) or an **organization-centric** form (First Name, Last Name, Email, Phone, Address, ZIP, Country, Terms, Newsletter)?

### Developer Handoff — 11-Point Checklist

| #  | Item                           | Defined? |
| -- | ------------------------------ | -------- |
| 1  | Cross-platform scope           | [ ]      |
| 2  | Technical feasibility          | [ ]      |
| 3  | Semantic HTML structure        | [ ]      |
| 4  | All UI states (empty, loading, error, populated, edge cases) | [ ] |
| 5  | Variable content (truncation, long text, missing data) | [ ] |
| 6  | Naming conventions (CSS vars, files, components) | [ ] |
| 7  | Placeholders (avatars, images, defaults) | [ ] |
| 8  | CSS units and resizing behavior | [ ] |
| 9  | File/image formats and optimization | [ ] |
| 10 | Accessibility requirements (WCAG level) | [ ] |
| 11 | Microinteractions and transitions | [ ] |

**Tips:** Don't just tell developers what to do — ask for their input. The more communication, the better the result.

**Output:** Confirm design is user-centric and team has shared understanding.

---

## Phase 8: Process Self-Check

### Design Thinking Phases (Are We Skipping Steps?)

| Phase       | Done? | Activities                                                              |
| ----------- | ----- | ----------------------------------------------------------------------- |
| **Discover** | [ ]  | User interviews, surveys, data analysis, competitor review, observation |
| **Define**   | [ ]  | Personas, empathy maps, user stories, problem statement, jobs-to-be-done |
| **Ideate**   | [ ]  | Brainstorm, mind maps, crazy 8's, affinity maps, information architecture |
| **Prototype**| [ ]  | Paper prototypes, wireframes, mockups, interactive prototypes, design handoff |
| **Test**     | [ ]  | Usability testing, A/B testing, SUS surveys, heuristic evaluation, analytics |

**If you jumped straight to Prototype without Discover/Define → stop and go back.** The process is iterative — collect feedback between each phase and loop back when needed.

### Google Design Sprint (5-Day Alternative)

For time-boxed problems: **Mon** = Map problem → **Tue** = Sketch solutions → **Wed** = Decide + storyboard → **Thu** = Build prototype → **Fri** = Test with 5 users.

---

## Output: UX Decision Summary

After working through the phases, produce:

```markdown
## UX Decision Summary: [Feature Name]

**User:** [Who, where in journey]
**Problem:** [One sentence]
**Solution:** [Simplest approach — Occam's Razor applied]

### Design Principles
- [Which principles guided composition]

### Usability
- [Heuristic violations found and fixed]

### Biases
- [Cognitive biases identified and mitigated]

### Accessibility
- [POUR compliance, WCAG AA status, gaps]

### Success Metrics
- [1-2 metrics + baseline + timeline]

### Open Questions
- [What needs user testing or stakeholder input]
```

---

## 10 Rules

1. **Never skip Phase 1** — if you don't know the user, you design for yourself
2. **Simplicity wins** — Occam's Razor. Every element must earn its place
3. **Question your defaults** — Law of the Hammer. Don't reuse patterns just because they're familiar
4. **Accessibility is mandatory** — POUR + WCAG 2.1 AA minimum, not optional
5. **Measure before building** — define success metrics upfront, not after launch
6. **Design is iterative** — loop back when you learn something new
7. **User-centric, not org-centric** — Conway's Law: don't let team structure dictate UI
8. **Anticipate resistance** — Baby Duck Syndrome: users resist change. Plan incremental transitions
9. **Use design tokens** — invoke `/design-token` skill for all visual values
10. **Heuristics are proxies** — real validation comes from real users, not checklists
