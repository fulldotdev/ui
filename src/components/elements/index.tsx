import type { Props as CardRootProps } from './card/CardRoot.astro'
import CardRoot from './card/CardRoot.astro'
import type { Props as CardSegmentProps } from './card/CardSegment.astro'
import CardSegment from './card/CardSegment.astro'
import type { Props as CardWriteupProps } from './card/CardWriteup.astro'
import CardWriteup from './card/CardWriteup.astro'

export {
  CardRoot,
  CardSegment,
  CardWriteup,
  CardRoot as Root,
  CardSegment as Segment,
  CardWriteup as Writeup,
}

export type {
  CardRootProps,
  CardSegmentProps,
  CardWriteupProps,
  CardRootProps as RootProps,
  CardSegmentProps as SegmentProps,
  CardWriteupProps as WriteupProps,
}
