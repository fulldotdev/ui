import Card, { type Props as CardProps } from './HighlightsCard.astro'
import Deck, { type Props as DeckProps } from './HighlightsDeck.astro'
import Section, { type Props as SectionProps } from './HighlightsSection.astro'

export {
  Card,
  Deck,
  Card as HighlightsCard,
  Deck as HighlightsDeck,
  Section as HighlightsSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  CardProps as HighlightsCardProps,
  DeckProps as HighlightsDeckProps,
  SectionProps as HighlightsSectionProps,
  SectionProps,
}
