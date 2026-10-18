---
"fulldev-ui": patch
---

The registry no longer keeps a second copy of the vega style at `public/r/{name}.json`. ui.full.dev keeps serving those URLs, used by installs from before 0.17, from `public/r/styles/base-vega/`. In the npm package, use `public/r/styles/base-vega/` instead.
