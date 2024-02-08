---
title: Posts
description: A reference page in my new Starlight docs site.
---

## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'
import type { Props as PostsCardProps } from './PostsCard.astro'

interface Props
  extends Pick<SectionProps, 'tagline' | 'heading' | 'text' | 'buttons'> {
  posts: PostsCardProps[] | null
}

const { props } = Astro
---

<Section
  {...props}
  cards={props.posts}
/>

```

## Card

```astro
---
import type { Props as CardProps } from '../../elements/card/Card.astro'
import Card from '../../elements/card/Card.astro'

interface Props
  extends Pick<
    CardProps,
    'href' | 'image' | 'tagline' | 'heading' | 'level' | 'text'
  > {}

const { props } = Astro
---

<Card {...props} />

```

## Deck

```astro
---
import type { Props as DeckProps } from '../../elements/deck/Deck.astro'
import Deck from '../../elements/deck/Deck.astro'
import type { Props as PostsCardProps } from './PostsCard.astro'

interface Props extends Pick<DeckProps, 'deck'> {
  posts?: PostsCardProps[] | null
}

const { props } = Astro
---

<Deck
  {...props}
  cards={props.posts}
/>

```