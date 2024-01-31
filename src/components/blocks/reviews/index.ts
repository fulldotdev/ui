import Card, { type Props as CardProps } from './ReviewsCard.astro'
import Deck, { type Props as DeckProps } from './ReviewsDeck.astro'
import Section, { type Props as SectionProps } from './ReviewsSection.astro'

export {
  Card,
  Deck,
  Card as ReviewsCard,
  Deck as ReviewsDeck,
  Section as ReviewsSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  CardProps as ReviewsCardProps,
  DeckProps as ReviewsDeckProps,
  SectionProps as ReviewsSectionProps,
  SectionProps,
}
