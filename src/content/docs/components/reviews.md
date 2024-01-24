---
title: Reviews
description: A reference page in my new Starlight docs site.
---

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'
import type { Props as ReviewsCardProps } from './ReviewsCard.astro'

export interface Props
  extends Pick<SectionProps, 'tagline' | 'heading' | 'text' | 'buttons'> {
  reviews: ReviewsCardProps[] | null
}

const { props } = Astro
---

<Section
  {...props}
  cards={props.reviews}
/>

```