---
"fulldev-ui": minor
---

Upgrade all Data Slot primitives and registry dependencies to 1.0.1. Use recommended
lazy mounting for Select, Tooltip, Hover Card and Navigation Menu, with an explicit
mountStrategy="eager" opt-in for integrations that query closed content. Discover nested
comboboxes and hover cards in retained content without duplicate initialization.

Release outgoing controllers on Astro page swaps so open overlays cannot leave stale
modal stacks or scroll locks. Give CommandDialog a trigger slot and correct the
sidebar search composition for strict nested ownership.

Use native autofocus for command palettes and native link activation for keyboard
commands. Align Slider defaults and Tabs values with the upstream API, and make
block dropdown links actual accessible menu items.

Use shadcn button defaults and consistent overlay layers so nested popups receive
pointer input. Form submissions should explicitly set type="submit".

Keep Data Slot modal stack layers and place floating positioners above them so
Select and other popups remain clickable inside dialogs.
