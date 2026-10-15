---
"fulldev-ui": patch
---

`Select` and `DropdownMenu` keep their popup within the screen: when the script does not set `--available-height`, the popup is at most 24rem and never taller than the screen, and long lists scroll. Before, a long list on a phone ran past the bottom and its last items could not be reached.

`Pricing1` cards fill the width on phones instead of shrinking to their content. This holds for the Astro and the React block.

`Doc1` code blocks fade long lines out before the copy button instead of running under it. This holds for the Astro and the React block.
