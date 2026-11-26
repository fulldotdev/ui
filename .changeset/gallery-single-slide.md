---
"fulldev-ui": patch
---

In Liquid, a carousel with `data-slides='single'` exposes only its shown slide to the keyboard and screen readers, as a product gallery needs. Before, a gallery whose width had a fraction of a pixel also exposed the next slide at load. Without the attribute, every slide in view stays exposed, as in a row of cards. A Liquid rating can now show part of a star: a `rating__fill` with a width, such as 50%, clips its star instead of shrinking it.
