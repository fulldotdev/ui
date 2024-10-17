import { defineCollection } from 'astro:content'
import { page } from 'fulldev-ui/schemas/collections/page'
import { layout } from 'fulldev-ui/schemas/preset'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  records: defineCollection({
    type: 'data',
    schema: page,
  }),
  presets: defineCollection({
    type: 'data',
    schema: layout,
  }),
}
