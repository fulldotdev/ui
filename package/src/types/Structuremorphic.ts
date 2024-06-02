import type { ComponentProps } from 'astro/types'
import type Carousel from '../components/structure/Carousel.astro'
import type Stack from '../components/structure/Stack.astro'

export type Structuremorphic<
  S extends
    | 'bento'
    | 'carousel'
    | 'grid'
    | 'masonry'
    | 'split'
    | 'spread'
    | 'stack',
> = S extends 'stack'
  ? ComponentProps<typeof Stack>
  : S extends 'carousel'
    ? ComponentProps<typeof Carousel>
    : undefined
