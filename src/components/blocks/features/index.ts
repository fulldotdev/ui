import Card, { type Props as CardProps } from './FeaturesCard.astro'
import Deck, { type Props as DeckProps } from './FeaturesDeck.astro'
import Section, { type Props as SectionProps } from './FeaturesSection.astro'

export {
  Card,
  Deck,
  Card as FeaturesCard,
  Deck as FeaturesDeck,
  Section as FeaturesSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  CardProps as FeaturesCardProps,
  DeckProps as FeaturesDeckProps,
  SectionProps as FeaturesSectionProps,
  SectionProps,
}
