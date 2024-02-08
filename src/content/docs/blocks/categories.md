---
title: Categories
description: A reference page in my new Starlight docs site.
---

The `Categories` component is used to render one or more categories as a `card`.


## Card
```astro
---
import type { Props as CardProps } from '../../elements/card/Card.astro'
import Card from '../../elements/card/Card.astro'

interface Props
  extends Pick<CardProps, 'href' | 'image' | 'tagline' | 'heading' | 'text'> {}

const { props } = Astro
---

<Card {...props} />

```
This will render a singular card, to render multiple use `Deck`.

Each `card` includes a `writeup` with the `tagline`, `heading` and `text` props that will be shown on the card. It also includes a `href`, which is used to redirect the user to that URL with an onclick event.

## Deck
```astro
---
import type { Props as DeckProps } from '../../elements/deck/Deck.astro'
import Deck from '../../elements/deck/Deck.astro'
import type { Props as CategoriesCardProps } from './CategoriesCard.astro'

interface Props extends Pick<DeckProps, 'deck'> {
  categories?: CategoriesCardProps[] | null
}

const { props } = Astro
---

<Deck
  {...props}
  cards={props.categories}
/>

```

## Section
```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'
import type { Props as CategoriesCardProps } from './CategoriesCard.astro'

interface Props
  extends Pick<SectionProps, 'tagline' | 'heading' | 'text' | 'buttons'> {
  categories?: CategoriesCardProps[] | null
}

const { props } = Astro
---

<Section {...props} />

```

## Layout
```astro
---
import type { CollectionEntry } from 'astro:content'
import SectionRenderer from '../../misc/SectionRenderer.astro'

import type { HTMLAttributes } from 'astro/types'
interface Props {
  entry: CollectionEntry<'pages'>
  frontmatter: CollectionEntry<'pages'>['data']
}

const { entry, frontmatter } = Astro.props
---

```