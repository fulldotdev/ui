import { z } from 'astro:content'

export const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
  })
  .partial()
  .strict()

export type ImageSchema = z.infer<typeof imageSchema>
