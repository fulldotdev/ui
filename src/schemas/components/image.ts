import { z } from 'astro:content'

export const imageSchema = z
  .object({
    src: z.string().nullish(),
    alt: z.string().nullish(),
  })
  .strict()

export type ImageSchema = z.infer<typeof imageSchema>
