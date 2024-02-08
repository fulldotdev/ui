import { defineCollection, z } from 'astro:content'

export const formsSchema = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    inputs: z.array(
      z.object({
        label: z.string(),
        type: z.string(), // You might want to specify the input type (e.g., text, email, etc.)
      })
    ),
    button: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
})
