import Card, { type Props as CardProps } from './PersonsCard.astro'
import Deck, { type Props as DeckProps } from './PersonsDeck.astro'
import Section, { type Props as SectionProps } from './PersonsSection.astro'

export {
  Card,
  Deck,
  Card as PersonsCard,
  Deck as PersonsDeck,
  Section as PersonsSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  CardProps as PersonsCardProps,
  DeckProps as PersonsDeckProps,
  SectionProps as PersonsSectionProps,
  SectionProps,
}
