import { z } from 'astro:content'
import { base } from './base'
import { card } from './card'
import { pathSchema } from './utils'

export const block = base
  .extend({
    columns: card.array(),
    cards: z.array(card),
    source: z.enum(['children', 'references']),
    pages: pathSchema('pages').array(),
    records: pathSchema('records').array(),
  })
  .partial()
  .passthrough()
