# Accessibility Guidelines -- WCAG 2.1 Map

> **WCAG (Web Content Accessibility Guidelines) 2.1 is a list of practical recommendations for making Web content more accessible for people with a wide range of disabilities.**

Web Content Accessibility Guidelines are created by World Wide Consortium (W3C) with the purpose of providing a set of standards for making the Internet more accessible by improving the user experience for people with disabilities. The recent version WCAG 2.1 was released in June 2018.

---

## Conformance Levels

| Level         | Conformance           | Description                                |
| ------------- | --------------------- | ------------------------------------------ |
| **Level A**   | Lowest conformance    | Essential, basic accessibility features    |
| **Level AA**  | Mid range conformance | Standard target for most organizations     |
| **Level AAA** | Highest conformance   | Maximum accessibility, aspirational target |

---

## The Four Principles

### 1. PERCEIVABLE

Information and user interface components must be presentable to users in ways they can perceive.

#### 1.1 Text Alternatives

- 1.1.1 Non-text Content -- Level A

#### 1.2 Time-based Media

- 1.2.1 Audio-only and Video-only (Prerecorded) -- Level A
- 1.2.2 Captions (Prerecorded) -- Level A
- 1.2.3 Audio Description or Media Alternative (Prerecorded) -- Level A
- 1.2.4 Captions (Live) -- Level AA
- 1.2.5 Audio Description (Prerecorded) -- Level AA
- 1.2.6 Sign Language (Prerecorded) -- Level AAA
- 1.2.7 Extended Audio Description (Prerecorded) -- Level AAA
- 1.2.8 Media Alternative (Prerecorded) -- Level AAA
- 1.2.9 Audio-only (Live) -- Level AAA

#### 1.3 Adaptable

- 1.3.1 Info and Relationships -- Level A
- 1.3.2 Meaningful Sequence -- Level A
- 1.3.3 Sensory Characteristics -- Level A
- 1.3.4 Orientation -- Level AA
- 1.3.5 Identify Input Purpose -- Level AA
- 1.3.6 Identify Purpose -- Level AAA

#### 1.4 Distinguishable

- 1.4.1 Use of Color -- Level A
- 1.4.2 Audio Control -- Level A
- 1.4.3 Contrast (Minimum) -- Level AA
- 1.4.4 Resize text -- Level AA
- 1.4.5 Images of Text -- Level AA
- 1.4.6 Contrast (Enhanced) -- Level AAA
- 1.4.7 Low or No Background Audio -- Level AAA
- 1.4.8 Visual Presentation -- Level AAA
- 1.4.9 Images of Text (No Exception) -- Level AAA
- 1.4.10 Reflow -- Level AA
- 1.4.11 Non-text Contrast -- Level AA
- 1.4.12 Text Spacing -- Level AA
- 1.4.13 Content on Hover or Focus -- Level AA

---

### 2. OPERABLE

User interface components and navigation must be operable.

#### 2.1 Keyboard Accessible

- 2.1.1 Keyboard -- Level A
- 2.1.2 No Keyboard Trap -- Level A
- 2.1.3 Keyboard (No Exception) -- Level AAA
- 2.1.4 Character Key Shortcuts -- Level A

#### 2.2 Enough Time

- 2.2.1 Timing Adjustable -- Level A
- 2.2.2 Pause, Stop, Hide -- Level A
- 2.2.3 No Timing -- Level AAA
- 2.2.4 Interruptions -- Level AAA
- 2.2.5 Re-authenticating -- Level AAA
- 2.2.6 Timeouts -- Level AAA

#### 2.3 Seizures & Physical Reactions

- 2.3.1 Three Flashes or Below Threshold -- Level A
- 2.3.2 Three Flashes -- Level AAA
- 2.3.3 Animation from Interactions -- Level AAA

#### 2.4 Navigable

- 2.4.1 Bypass Blocks -- Level A
- 2.4.2 Page Titled -- Level A
- 2.4.3 Focus Order -- Level A
- 2.4.4 Link Purpose (In Context) -- Level A
- 2.4.5 Multiple Ways -- Level AA
- 2.4.6 Headings and Labels -- Level AA
- 2.4.7 Focus Visible -- Level AA
- 2.4.8 Location -- Level AAA
- 2.4.9 Link Purpose (Link Only) -- Level AAA
- 2.4.10 Section Headings -- Level AAA

#### 2.5 Input Modalities

- 2.5.1 Pointer Gestures -- Level A
- 2.5.2 Pointer Cancellation -- Level A
- 2.5.3 Label in Name -- Level A
- 2.5.4 Motion Actuation -- Level A
- 2.5.5 Target Size -- Level AAA
- 2.5.6 Concurrent Input Mechanisms -- Level AAA

---

### 3. UNDERSTANDABLE

Information and the operation of user interface must be understandable.

#### 3.1 Readable

- 3.1.1 Language of Page -- Level A
- 3.1.2 Language of Parts -- Level AA
- 3.1.3 Unusual Words -- Level AAA
- 3.1.4 Abbreviations -- Level AAA
- 3.1.5 Reading Level -- Level AAA
- 3.1.6 Pronunciation -- Level AAA

#### 3.2 Predictable

- 3.2.1 On Focus -- Level A
- 3.2.2 On Input -- Level A
- 3.2.3 Consistent Navigation -- Level AA
- 3.2.4 Consistent Identification -- Level AA
- 3.2.5 Change on Request -- Level AAA

#### 3.3 Input Assistance

- 3.3.1 Error Identification -- Level A
- 3.3.2 Labels of Instructions -- Level A
- 3.3.3 Error Suggestion -- Level AA
- 3.3.4 Error Prevention (Legal, Financial, Data) -- Level AA
- 3.3.5 Help -- Level AAA
- 3.3.6 Error Prevention (All) -- Level AAA

---

### 4. ROBUST

Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

#### 4.1 Compatible

- 4.1.1 Parsing -- Level A
- 4.1.2 Name, Role, Value -- Level A
- 4.1.3 Status Messages -- Level AA

---

## Practical Tips

### How to Use WCAG 2.1

The best way to do it is to scrutinize each page of your website or application against the WCAG 2.1 success criteria. There is plenty of WCAG checklists and tools enabling to automate the testing process.

- Start with **Level A** criteria -- these are non-negotiable basics
- Target **Level AA** for production applications -- this is the industry standard
- Use automated tools (axe, Lighthouse, WAVE) for initial audits, then verify manually
- Test with real assistive technologies (screen readers, keyboard-only navigation)
- Include accessibility testing in your CI/CD pipeline

---

## Tags

`accessibility` `wcag` `wcag 2.1` `a11y` `w3c` `inclusive design` `screen readers`

