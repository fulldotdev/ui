---
title: Link
description: A reference page in my new Starlight docs site.
---

The `Link` element is used render a standard [`HTML <a> tag`](https://www.w3schools.com/tags/tag_a.asp) with already set styling. It also takes two props: `label` and `href`.

```astro
<!-- Link.astro -->
---
import type { HTMLAttributes } from 'astro/types'

export type LinkProps = Props
export interface Props {
  label?: string | null
  href?: HTMLAttributes<'a'>['href'] | null
}

const { href, label } = Astro.props
---

<a
  href={href}
  class="link text-size-inherit text-hue11 hover:text-hue12"
>
  {label}
</a>

```

## Links

You may also take advantage of the `links` element, which renders one or multiple links using the `link` element.

```astro
<!-- Links.astro -->
---
import List, { type ListProps } from '@components/wrappers/List.astro'
import type { LinkProps } from './Link.astro'
import Link from './Link.astro'

type Props = Omit<LinkProps, 'label' | 'href'> &
  ListProps & {
    links: LinkProps[]
  }

const { links, ...restProps } = Astro.props
---

<List {...restProps}>
  {
    links?.map((link) => (
      <Link
        {...link}
        {...restProps}
      />
    ))
  }
</List>

```

:::caution
The `Links` element uses the `List` wrapper, which you can read more about [here](/wrappers/list).
:::
