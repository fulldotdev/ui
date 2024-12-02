import { z } from 'astro:content'

export const taglineSchema = z
  .object({
    text: z.string().optional(),
  })
  .strict()

export type TaglineSchema = z.infer<typeof taglineSchema>
