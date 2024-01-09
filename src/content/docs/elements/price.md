---
title: Price
description: A reference page in my new Starlight docs site.
---

The `Price` element turns any number into a two decimal number and puts the euro symbol infront of the number.

```astro
<!-- Price.astro -->
---
const { price } = Astro.props
const priceNumber = parseFloat(price)
const fixedPrice = priceNumber?.toFixed(2)
---

{
  price && fixedPrice && (
    <span class="text-size2 text-hue12"> &euro;{fixedPrice}</span>
  )
}

```
