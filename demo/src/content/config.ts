import { pageSchema } from '@fullui/ui'
import { defineCollection } from 'astro:content'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchema(),
  }),
  layouts: defineCollection({
    type: 'content',
    schema: pageSchema(),
  }),
  components: defineCollection({
    type: 'content',
    schema: pageSchema(),
  }),
}
