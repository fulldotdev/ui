import Card, { type Props as CardProps } from './ServicesCard.astro'
import Deck, { type Props as DeckProps } from './ServicesDeck.astro'
import Layout, { type Props as LayoutProps } from './ServicesLayout.astro'
import Section, { type Props as SectionProps } from './ServicesSection.astro'

export {
  Card,
  Deck,
  Layout,
  Section,
  Card as ServicesCard,
  Deck as ServicesDeck,
  Layout as ServicesLayout,
  Section as ServicesSection,
}

export type {
  CardProps,
  DeckProps,
  LayoutProps,
  SectionProps,
  CardProps as ServicesCardProps,
  DeckProps as ServicesDeckProps,
  LayoutProps as ServicesLayoutProps,
  SectionProps as ServicesSectionProps,
}
