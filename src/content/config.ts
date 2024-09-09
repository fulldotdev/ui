import { defineCollection } from 'astro:content'
import { page } from 'fulldev-blocks'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  records: defineCollection({
    type: 'data',
    schema: page,
  }),
  settings: defineCollection({
    type: 'data',
    schema: page,
  }),
}
