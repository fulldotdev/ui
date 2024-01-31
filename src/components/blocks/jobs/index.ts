import Card, { type Props as CardProps } from './JobsCard.astro'
import Deck, { type Props as DeckProps } from './JobsDeck.astro'
import Section, { type Props as SectionProps } from './JobsSection.astro'

export {
  Card,
  Deck,
  Card as JobsCard,
  Deck as JobsDeck,
  Section as JobsSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  CardProps as JobsCardProps,
  DeckProps as JobsDeckProps,
  SectionProps as JobsSectionProps,
  SectionProps,
}
