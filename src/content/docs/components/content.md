---
title: Content
description: A reference page in my new Starlight docs site.
---

The `Content` component is used to render any kind of content. It includes a `writeup` with the `tagline`, `heading` and `text` props. The `level` prop is used to determine what heading you need, this includes: `h1` to `h6`.

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'

export interface Props
  extends Pick<
    SectionProps,
    'level' | 'tagline' | 'heading' | 'text' | 'image'
  > {}

const { props } = Astro
---

<Section {...props} />

```