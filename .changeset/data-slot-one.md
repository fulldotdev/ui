---
"fulldev-ui": minor
---

Upgrade all Data Slot primitives and registry dependencies to 1.0.1. Preserve
connected hidden content by default for Select, Tooltip, Hover Card and Navigation
Menu, with an explicit mountStrategy prop for lazy mounting. Discover nested
comboboxes and hover cards in retained content without duplicate initialization.

Release outgoing controllers on Astro page swaps so open overlays cannot leave stale
modal stacks or scroll locks. Give CommandDialog a trigger slot and correct the
sidebar search composition for strict nested ownership.
