---
"fulldev-ui": minor
---

The npm package now holds only the registry of each release: the files served at `https://ui.full.dev/r`, now including React, and the native Liquid files at their theme paths. It no longer installs dependencies or peer dependencies, and no longer ships the unstyled component sources, which need the registry build for their styles. Install components with the shadcn CLI as before.
