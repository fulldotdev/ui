---
title: Prose
description: A reference page in my new Starlight docs site.
---

The `Prose` element is used to render text that is not formatted in any kind of way. It automatically adds styling classes to heading tags and formats the text to the left.

```astro
<!-- Prose.astro -->
---
import type { HTMLAttributes } from 'astro/types'
interface Props {
  prose?: any
  Content?: any
}

const { prose, Content } = Astro.props
---

{
  (prose || Content) && (
    <div
      class:list={[
        'max-w-3xl text-left',
        '[&_h1]:(heading mb-size3) [&_h1+p]:(mb-size6) ',
        '[&_h2]:(heading mt-size5 mb-size3)',
        '[&_h3]:(subheading mt-size5 mb-size3)',
        '[&_p]:(text mt-size3)',
        '[&_*:fisrt-child]:mt-0 [&_*:last-child]:mb-0',
      ]}
      set:html={prose}
    >
      {Content && <Content />}
    </div>
  )
}

```

### Props

The `Prose` element accepts two props: `prose` and `Content`. Both of these props have two very different purposes.

:::note
Vraag Sil over het verschil van de prose en content prop.

TODO
:::
