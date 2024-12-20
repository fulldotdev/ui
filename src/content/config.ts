import { defineCollection } from 'astro:content'
import { cardSchema } from 'fulldev-ui/schemas/card.ts'
import { pageSchema } from 'fulldev-ui/schemas/page.ts'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  layouts: defineCollection({
    type: 'data',
    schema: pageSchema,
  }),
  records: defineCollection({
    type: 'data',
    schema: cardSchema,
  }),
}
