---
title: Highlights
description: A reference page in my new Starlight docs site.
---

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'
import type { Props as HighlightsCardProps } from './HighlightsCard.astro'

export interface Props
  extends Pick<SectionProps, 'tagline' | 'heading' | 'text' | 'buttons'> {
  highlights: HighlightsCardProps[] | null
}

const { props } = Astro
---

<Section
  {...props}
  cards={props.highlights}
/>

```