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

## Card

```astro
---
import type { Props as CardProps } from '../../elements/card/Card.astro'
import Card from '../../elements/card/Card.astro'

export interface Props
  extends Pick<CardProps, 'tagline' | 'heading' | 'text'> {}

const { props } = Astro
---

<Card {...props} />

```

## Deck

```astro
---
import type { Props as DeckProps } from '../../elements/deck/Deck.astro'
import Deck from '../../elements/deck/Deck.astro'
import type { Props as FeaturesCardProps } from './FeaturesCard.astro'

export interface Props extends Pick<DeckProps, 'deck'> {
  features?: FeaturesCardProps[] | null
}

const { props } = Astro
---

<Deck
  {...props}
  cards={props.features}
/>

```