import { defineCollection } from 'astro:content'
import { layoutSchema } from 'fulldev-ui/schemas/layoutSchema.ts'
import { pageSchema } from 'fulldev-ui/schemas/pageSchema.ts'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema,
  }),
  layouts: defineCollection({
    type: 'data',
    schema: layoutSchema,
  }),
}
