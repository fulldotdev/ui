import { defineCollection, z } from 'astro:content'

const componentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    props: z.any(),
  }),
})

export const collections = {
  components: componentsCollection,
}
