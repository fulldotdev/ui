---
title: Intro
description: A reference page in my new Starlight docs site.
---

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'

export interface Props
  extends Pick<SectionProps, 'layout' | 'tagline' | 'heading' | 'text'> {}

const { props } = Astro
---

<Section {...props} />

```