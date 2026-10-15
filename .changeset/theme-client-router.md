---
"fulldev-ui": patch
---

`ThemeProvider` keeps the theme across Astro `<ClientRouter />` navigation. Before, each navigation briefly showed the light theme and saved it as the visitor's choice, so a dark theme was lost.
