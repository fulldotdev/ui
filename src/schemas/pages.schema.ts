import { defineCollection, z } from 'astro:content'

export const pagesSchema = defineCollection({
  type: 'data',
  // @dylan deze any vervangen voor een zod schema. Je kunt de .md schema gebruiken als voorbeeld.
  // Chatgpt kan je helpen dit om te zetten naar een zod schema. Zie ook de zod docs
  schema: z.any(),
})
