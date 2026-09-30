---
"fulldev-ui": patch
---

Improve the `LayoutHead` social tags: add `twitter:card` (`summary_large_image` with an image, `summary` without), emit `og:image:type` for optimized images, skip `og:image` when the image source is empty, and follow `trailingSlash: "never"` in the canonical and `og:url`.
