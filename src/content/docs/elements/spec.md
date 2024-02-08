---
title: Spec
description: A reference page in my new Starlight docs site.
---

The `Spec` element is used to show a specification of whatever item you would like. It will add a checkmark infront of the text to show that the specification is included. It takes one prop `spec`, which is a string that will be rendered in a `span` as text.

Currently it is not possible to add a `cross` to show it is _not included_. This may be added at a later date.

```astro
<!-- Spec.astro -->
---
export type SpecProps = Props
import type { HTMLAttributes } from 'astro/types'
interface Props {
  spec?: string
}

const { spec, ...restProps } = Astro.props
---

<li
  class="spec text text-hue12 gap-.5em flex"
  {...restProps}
>
  <i class="icon:check hue-brand text w-1.5em h-1.5em inline-block">
    checkmark
  </i>
  <span class="text-hue12">
    {spec}
  </span>
</li>

```

## Specs

Most of the time you want to add multiple specifications, which is what `Specs` is for. It allows for rendering one or more specifications using the `Spec` element.

```astro
<!-- Specs.astro -->
---
import List, { type ListProps } from '../../wrappers/List.astro'
import type { SpecProps } from './Spec.astro'
import Spec from './Spec.astro'

type Props = Omit<SpecProps, 'label'> &
  ListProps & {
    specs?: string[] | null
  }
const { specs } = Astro.props
---

<List>
  {specs?.map((spec) => <Spec {spec} />)}
</List>
```

:::caution
This element uses the `List` Root, which you can read more about [here](/wrappers/list)
:::
