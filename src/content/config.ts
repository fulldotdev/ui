import { defineCollection } from 'astro:content'
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
}
