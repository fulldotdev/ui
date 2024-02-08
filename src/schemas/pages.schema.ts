import { defineCollection, z } from 'astro:content'

export const pagesSchema = defineCollection({
  type: 'data',
  // @dylan deze any vervangen voor een zod schema. Je kunt de .md schema gebruiken als voorbeeld.
  // Chatgpt kan je helpen dit om te zetten naar een zod schema. Zie ook de zod docs
  // Zie ook de astro content collection docs
  // de 'sections' key is een array met sections. Deze is alleen wel heel complex, dus deze mag je op any zetten
  schema: z.any(),
})
