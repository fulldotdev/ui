import { pageSchemaClean } from '@fullui/ui'
import { defineCollection } from 'astro:content'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: pageSchemaClean(),
  }),
  layouts: defineCollection({
    type: 'content',
    schema: pageSchemaClean(),
  }),
}
