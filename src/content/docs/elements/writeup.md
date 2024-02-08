---
title: Writeup
description: A reference page in my new Starlight docs site.
---

The `Writeup` element renders text together with a `tagline` and `title`. This is typically used for reviews or articles. It adds default styling to `heading` and `<p>` tags.

```astro
<!-- Writeup.astro -->
---
import type { HTMLAttributes } from 'astro/types'
interface Props {
  writeup?: string | null
  tagline?: string | null
  title?: string | null
  description?: string | null
}

const { writeup, tagline, title, description } = Astro.props
---

{
  (writeup ||
    tagline ||
    title ||
    description ||
    Astro.slots.has('default')) && (
    <div
      class:list={[
        '[&_h1,&_h2,&_h3,&_h4,&_h5,&_h6]:my-size3',
        '[&_p]:mt-size2',
        '[&_p:first-child:not(:last-child)]:(hue-brand text-size1) first:[&_*]:!mt-0 last:[&_*]:!mb-0',
      ]}
    >
      {tagline && <span>{tagline}</span>}
      {title && <h4>{title}</h4>}
      {description && <p>{description}</p>}
      {writeup && typeof writeup === 'string' && (
        <Fragment set:html={writeup} />
      )}
      <slot />
    </div>
  )
}

```

:::caution
This element uses the `Fragment` component, which is currently not included or documentated.
:::

## Props

The `Writeup` element takes four props, which are all optional: `writeup`, `tagline`, `title`, and `description`.

### Writeup

The `writeup` prop is used to ???

### Tagline

The `tagline` prop is used to be displayed above the `writeup`, but below the `title`. It is usually used to show what product is being reviewed or when the article was published.

### Title

The `title` prop is displayed above all the other props and as the name suggests will be the title of the `review`, `article` or whatever you are using this element for.

### Description

The `description` prop is used to ???
