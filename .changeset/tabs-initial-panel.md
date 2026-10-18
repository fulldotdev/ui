---
"fulldev-ui": patch
---

Tabs show their initial panel in the server-rendered HTML, the one Data Slot selects: the `defaultValue` when its trigger is enabled, or else the first enabled trigger. Before, every panel stayed hidden until the tabs script started, so the page shifted when it did; it also works without JavaScript now.
