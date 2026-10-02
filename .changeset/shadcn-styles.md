---
"fulldev-ui": minor
---

Support all shadcn/ui styles: vega, nova, maia, lyra, mira, luma, sera, and rhea.
Components use shadcn/ui `cn-*` style placeholders, and the registry serves every
style at `https://ui.full.dev/r/styles/{style}/{name}.json`, so components install in
the style from your `components.json`. `/r/{name}.json` keeps serving vega. The docs
previews have a style menu, and a new Create page builds shadcn/ui presets
that apply to all docs previews.
