import Card, { type Props as CardProps } from './CategoriesCard.astro'
import Deck, { type Props as DeckProps } from './CategoriesDeck.astro'
import Layout, { type Props as LayoutProps } from './CategoriesLayout.astro'
import Section, { type Props as SectionProps } from './CategoriesSection.astro'

export {
  Card,
  Card as CategoriesCard,
  Deck as CategoriesDeck,
  Layout as CategoriesLayout,
  Section as CategoriesSection,
  Deck,
  Layout,
  Section,
}

export type {
  CardProps,
  CardProps as CategoriesCardProps,
  DeckProps as CategoriesDeckProps,
  LayoutProps as CategoriesLayoutProps,
  SectionProps as CategoriesSectionProps,
  DeckProps,
  LayoutProps,
  SectionProps,
}
