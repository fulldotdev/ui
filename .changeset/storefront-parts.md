---
"fulldev-ui": minor
---

Add three storefront parts in Astro, React and native Liquid: `NumberField`, a number input with decrement and increment buttons for quantities; `Swatch`, a color or image beside an option or filter value; and `CarouselIndicator`, a thumbnail that shows its slide, for a product gallery. In Astro and Liquid the number field is a native `<input type="number">` in an input group, as data-slot leaves number fields to the browser, and its buttons fire `input` and `change`; in React it is Base UI's NumberField. An indicator can link to its slide's id, so it also works without JavaScript. In React, `CarouselIndicator` goes inside the official shadcn/ui carousel. Astro `InputGroup` takes a `data-slot`. In Liquid, a native select keeps its text clear of the arrow, and an input group addon sits at the start unless it has `data-align='inline-end'`, as in Astro, so a start icon no longer touches the border. Data-slot packages move to 1.1.3.
