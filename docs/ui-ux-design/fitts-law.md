# Fitts's Law in UX Design

> **The time required to acquire a target area is a function of the ratio between the distance to and size of the target.**

Fitts's Law was introduced by psychologist Paul Fitts in 1954. The law has big importance in human-computer interaction and defines the correlation between a cursor movement or a touch gesture and an interface element.

---

## The Formula

```
T = a + b * log2(D/W + 1)
```

Where:

- **T** = time to acquire the target
- **D** = distance from the starting point to the target
- **W** = width (size) of the target
- **a, b** = empirical constants

**In plain terms:** the closer and larger a target is, the faster it is to interact with.

---

## How Does It Apply to UI Design?

### 1. Distinguish Interactive from Non-Interactive Elements

Interactive elements should be distinguished from non-interactive elements by size and look. Buttons, links, and form controls should be visually distinct and appropriately sized.

### 2. Prime Pixel

Sometimes a designer can predict where the **prime pixel** is (the point from which the user will continue interaction). Position more important and related UI elements closer to this pixel.

### 3. Magic Pixels

**Magic pixels** are the furthest areas from the prime pixel. Avoid placing anything important into these areas.

### 4. Edge & Corner Advantage

The outer edges and corners of the UI can be reached with greater speed than anywhere else in the display, due to the pinning action of the screen. This is why menus placed at screen edges (like macOS menu bar) are faster to reach.

### 5. Size & Distance Tradeoff

A UI element is easier to select if its size is increased or the distance to it is decreased. Both approaches reduce acquisition time.

---

## Practical Tips

- Reduce the distance from one point to the next in UI and make the target object large enough to enable prompt detection and selection of interactive elements without sacrificing accuracy.
- Make every combination of a checkbox/radio + label as the entirely clickable area.
- Don't go overboard with putting elements too close to each other or making them too big. Follow visual balance and hierarchy, give the user breathing room.
- Establish a meaningful visual hierarchy in UI elements and content.
- Appropriate grouping is important in articulating functionality.
- Provide enough space between elements for error-prevention.

---

## Tags

`fitts's law` `interaction design` `target size` `ux laws` `human-computer interaction` `usability`
