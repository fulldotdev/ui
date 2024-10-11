import { defineCollection } from 'astro:content'
import { layout } from 'fulldev-ui/schemas/layout'
import { page } from 'fulldev-ui/schemas/page'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  records: defineCollection({
    type: 'data',
    schema: page,
  }),
  layouts: defineCollection({
    type: 'data',
    schema: layout,
  }),
  blocks: defineCollection({
    type: 'data',
    schema: page,
  }),
}
