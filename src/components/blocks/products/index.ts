import Card, { type Props as CardProps } from './ProductsCard.astro'
import Deck, { type Props as DeckProps } from './ProductsDeck.astro'
import Layout, { type Props as LayoutProps } from './ProductsLayout.astro'
import Section, { type Props as SectionProps } from './ProductsSection.astro'

export {
  Card,
  Deck,
  Layout,
  Card as ProductsCard,
  Deck as ProductsDeck,
  Layout as ProductsLayout,
  Section as ProductsSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  LayoutProps,
  CardProps as ProductsCardProps,
  DeckProps as ProductsDeckProps,
  LayoutProps as ProductsLayoutProps,
  SectionProps as ProductsSectionProps,
  SectionProps,
}
