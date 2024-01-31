import Card, { type Props as CardProps } from './PostsCard.astro'
import Deck, { type Props as DeckProps } from './PostsDeck.astro'
import Layout, { type Props as LayoutProps } from './PostsLayout.astro'
import Section, { type Props as SectionProps } from './PostsSection.astro'

export {
  Card,
  Deck,
  Layout,
  Card as PostsCard,
  Deck as PostsDeck,
  Layout as PostsLayout,
  Section as PostsSection,
  Section,
}

export type {
  CardProps,
  DeckProps,
  LayoutProps,
  CardProps as PostsCardProps,
  DeckProps as PostsDeckProps,
  LayoutProps as PostsLayoutProps,
  SectionProps as PostsSectionProps,
  SectionProps,
}
