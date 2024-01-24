---
title: Cta
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
    'layout' | 'tagline' | 'heading' | 'text' | 'buttons'
  > {}

const { props } = Astro
---

<Section {...props} />

```