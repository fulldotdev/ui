---
title: Features
description: A reference page in my new Starlight docs site.
---

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'
import type { Props as FeaturesDeckProps } from './FeaturesDeck.astro'

interface Props
  extends FeaturesDeckProps,
    Pick<SectionProps, 'layout' | 'tagline' | 'heading' | 'text' | 'buttons'> {}

const { props } = Astro
---

<Section
  {...props}
  cards={props.features}
/>

```