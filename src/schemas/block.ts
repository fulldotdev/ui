import { z } from 'astro:content'
import { base } from './base'
import { card } from './card'
import { pathSchema } from './utils'

export const block = base
  .extend({
    columns: card.array(),
    cards: z.array(card.or(pathSchema('cards'))),
    source: z.literal('children').or(z.literal('references')),
    pages: pathSchema('pages').array(),
    records: pathSchema('records').array(),
    page: pathSchema('pages'),
    block: pathSchema('blocks'),
    posts: pathSchema('posts').array(),
    reviews: pathSchema('reviews').array(),
    review: base,
    features: base.array(),
  })
  .partial()
  .passthrough()

// export type Block<As extends HTMLTag> = z.infer<typeof base> &
//   ComponentProps<typeof Section<As>> &
//   Pick<ComponentProps<typeof Heading>, 'level'> &
//   Pick<ComponentProps<typeof Image>, 'position'>
