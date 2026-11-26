---
"fulldev-ui": minor
---

Add three storefront parts in Astro, React and native Liquid: `NumberField`, a number input with decrement and increment buttons for quantities; `Swatch`, a color or image beside an option or filter value; and `CarouselIndicator`, a thumbnail that shows its slide, for a product gallery. In Astro and Liquid the number field is a native `<input type="number">` in an input group, as data-slot leaves number fields to the browser, and its buttons fire `input` and `change`; in React it is Base UI's NumberField. In Liquid an indicator can link to its slide's id, so it also works without JavaScript. In React, `CarouselIndicator` goes inside the official shadcn/ui carousel. In Liquid, a native select keeps its text clear of the arrow, and an input group addon before the input gets its padding at the start, so a start icon no longer touches the border; `data-align='inline-start'` or `'inline-end'` names the side, as in Astro. Data-slot packages move to 1.1.3.
