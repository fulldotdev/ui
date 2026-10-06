---
"fulldev-ui": minor
---

- `Button` writes `data-variant` and `data-size` on its root element, as shadcn/ui's Button does. Without a `variant` or `size`, both are `default`. Classes and props are unchanged.
- `Card` takes a polymorphic `as` prop, so a card can render as an `article`, `section`, `a`, `li`, `dl` or any other element, with that element's attributes. It keeps `data-slot="card"` and `data-size`, and still renders a `div` by default.
- `CardTitle` takes a polymorphic `as` prop, so a title can be a heading such as `h2` or `h3`. It still renders a `div` by default.
