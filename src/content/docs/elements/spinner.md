---
title: Spinner
description: A reference page in my new Starlight docs site.
---

The `Spinner` component includes an SVG spinner. It also takes two props, as shown below:

```ts
import type { HTMLAttributes } from 'astro/types'
interface Props {
  size?: string
  fill?: string
}
```

The default values of these props are:

```astro
const { size = '2em', fill = 'currentColor' } = Astro.props
```
The `size` prop supports all [CSS Relative length units](https://www.w3schools.com/cssref/css_units.php)

The `fill` prop supports HEX color codes.


Since both props have default values, it means that you do not need to provide any props and may import the `Spinner` directly like this:

```astro
---
import Spinner from '@fullui'
---

<Spinner />
```

