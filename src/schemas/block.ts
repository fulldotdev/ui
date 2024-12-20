import { z } from 'astro:content'
import { cardSchema } from 'fulldev-ui/schemas/card.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'

export const blockSchema = cardSchema
  .extend({
    _block: z.string().optional(),
    themer: z.boolean().optional(),
    search: z.boolean().optional(),
    cart: z.boolean().optional(),
    cards: cardSchema.array().optional(),
    pages: pathSchema('pages').array().optional(),
    records: pathSchema('records').array().optional(),
  })
  .strict()
