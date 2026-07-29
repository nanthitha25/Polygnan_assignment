# EYFI Campus Ambassador Program – Interactive Reward Ladder

> **Product Requirement & System Architecture Specification**

The complete specification document for the **EYFI Campus Ambassador Program - Interactive Reward Ladder** is available in [EYFI-Reward-Ladder-Spec.md](file:///Users/nanthithavenkatachapathy/polygnan_assignment/Polygnan_assignment/EYFI-Reward-Ladder-Spec.md).

## Quick Summary

The Interactive Reward Ladder is a dynamic visual widget designed to gamify ambassador traction by allowing college students to scrub through registrations (0 to 200+), preview rewards, receive real-time delta notifications, and view responsive tier cards with smooth micro-animations.

### Core Architecture Components

- **Traction Simulator (Slider):** Scrubbable range slider (0–200+) updating state stream.
- **Dynamic Progress Track:** Visual fill line connecting key milestone nodes.
- **Stateful Tier Cards:** 6 tiers (Scout, Ambassador, Captain, Lead, Polygnan Legend, Founding Tier) with Locked, Active/Hover, and Unlocked states.
- **Dynamic Callout Banner:** Calculates registration delta needed to reach the next unlock milestone.

For full architectural diagrams (Mermaid + ASCII), field schemas, React code snippets, and testing matrix, view the full specification in [EYFI-Reward-Ladder-Spec.md](file:///Users/nanthithavenkatachapathy/polygnan_assignment/Polygnan_assignment/EYFI-Reward-Ladder-Spec.md).
