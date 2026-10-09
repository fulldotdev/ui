---
"fulldev-ui": minor
---

Simplify block props and improve block semantics (breaking).

- Blocks drop unused fields and button variants: button styles are fixed in each block. User-facing copy such as screen reader labels, close labels and rating labels is passed in by the caller. Banner1 takes an optional `storageKey` for dismissal instead of a shared hardcoded key. `BannerContainer` gains an optional `closeLabel` and `Sidebar` gains optional `mobileTitle` and `mobileDescription`.
- `SectionContainer` only sets width, gutter and position. It no longer adds `flex flex-col gap-8`; add the layout classes your content needs, such as `class="flex flex-col gap-8"`.
- Marquee renders its items once and moves them with Embla and its Auto Scroll plugin. Compose it from `Marquee`, `MarqueeContent` (`reverse` replaces `direction`), `MarqueeItem` and `MarqueeToggle` (`playLabel`, `pauseLabel`). It stays static without a toggle, with reduced motion, or when the items do not fill the row. The `duration`, `gap`, `infinite` and `pauseOnHover` props are removed; set `--marquee-gap` for spacing. Logos2, Reviews4 and Reviews5 take `labels: { play, pause }`.
- `PriceValue` takes `discountLabel` for the savings badge, keeps a `0` price or compare-at price, and only shows a compare-at price above the price. Pricing1-3, Product1 and Products1-5 take `locale` and `discountLabel`, and every price is `{ value, compareAt?, currency, unit }`. Pricing2 emphasizes plans with `featured` instead of the first plan.
- Header1-5 render their `buttons` in the mobile menu too and no longer have a default or `mobile` slot. Buttons always show their label and open in the same tab unless they set `target: "_blank"`. The logo takes typed images without `alt`, and Header4 and Header5 menu images are decorative.
- Features1 and Features4 take `link?: { label, href }` instead of `href` and `linkText`. Services4 and Services5 take a `link` per service instead of `linkLabel`.
- Contact1-3 render your form from their default slot instead of building one from `form` props. Contact items link their visible text.
- Sidebar1 takes `currentPath` and native attributes for its root, and `labels.sidebar` names the sidebar while `labels.sidebarToggle` names its trigger.
- Hero1's badge is optional. Background images in Hero3, Hero4, Hero9-11 and CTA4 are decorative and take no `alt`; social proof avatars no longer take `name`.
