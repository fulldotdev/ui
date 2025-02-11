import { z } from 'astro:content'
import { imageSchema } from '../fields/image'

export const postSingleSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type PostSingleSchema = z.infer<typeof postSingleSchema>
