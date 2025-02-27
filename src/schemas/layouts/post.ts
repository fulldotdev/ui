import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const postSchema = z
  .object({
    title: z.string(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
  })
  .strict()

export type PostSchema = z.infer<typeof postSchema>
