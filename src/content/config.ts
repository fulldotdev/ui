import { defineCollection } from 'astro:content'
import page from 'fulldev-ui/schemas/page'
import preset from 'fulldev-ui/schemas/preset'
import record from 'fulldev-ui/schemas/record'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  records: defineCollection({
    type: 'data',
    schema: record,
  }),
  presets: defineCollection({
    type: 'data',
    schema: preset,
  }),
}
