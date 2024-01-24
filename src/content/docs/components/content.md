---
title: Content
description: A reference page in my new Starlight docs site.
---

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'

interface Props
  extends Pick<
    SectionProps,
    'level' | 'tagline' | 'heading' | 'text' | 'image'
  > {}

const { props } = Astro
---

<Section {...props} />

```