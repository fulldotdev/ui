import { defineCollection, reference } from 'astro:content'
import { pageSchema } from '../schemas/collection'

const collection = defineCollection({
  type: 'content',
  schema: pageSchema({
    page: reference('pages'),
    pages: reference('pages').array(),
  }),
})

export const collections = {
  pages: collection,
}
