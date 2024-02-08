---
title: Persons
description: A reference page in my new Starlight docs site.
---

<<<<<<< HEAD
=======
## Section

```astro
---
import type { Props as SectionProps } from '../../elements/section/Section.astro'
import Section from '../../elements/section/Section.astro'
import type { Props as PersonsCardProps } from './PersonsCard.astro'

interface Props
  extends Pick<SectionProps, 'tagline' | 'heading' | 'text' | 'buttons'> {
  persons: PersonsCardProps[] | null
}

const { props } = Astro
---

<Section
  {...props}
  cards={props.persons}
/>

```

## Card

```astro
---
import type { Props as CardProps } from '../../elements/card/Card.astro'
import Card from '../../elements/card/Card.astro'

interface Props
  extends Pick<CardProps, 'image' | 'tagline' | 'heading' | 'text'> {}

const { props } = Astro
---

<Card {...props} />

```

## Deck

```astro
---
import type { Props as DeckProps } from '../../elements/deck/Deck.astro'
import Deck from '../../elements/deck/Deck.astro'
import type { Props as PersonsCardProps } from './PersonsCard.astro'

interface Props extends Pick<DeckProps, 'deck'> {
  persons?: PersonsCardProps[] | null
}

const { props } = Astro
---

<Deck
  {...props}
  cards={props.persons}
/>

```
>>>>>>> main
