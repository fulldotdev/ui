import Card, { type Props as CardProps } from './OffersCard.astro'
import Deck, { type Props as DeckProps } from './OffersDeck.astro'
import Section, { type Props as SectionProps } from './OffersSection.astro'

export {
  Card,
  Deck,
  Card as OffersCard,
  Deck as OffersDeck,
  Section as OffersSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  CardProps as OffersCardProps,
  DeckProps as OffersDeckProps,
  SectionProps as OffersSectionProps,
  SectionProps,
}
