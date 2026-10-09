---
"fulldev-ui": minor
---

Simplify block props (breaking). Blocks drop unused fields and button variants: button styles are now fixed in each block. User-facing copy such as screen reader labels, close labels and rating labels is passed in by the caller. Banner1 takes an optional `storageKey` for dismissal instead of a shared hardcoded key. `BannerContainer` gains an optional `closeLabel` and `Sidebar` gains optional `mobileTitle` and `mobileDescription`.
