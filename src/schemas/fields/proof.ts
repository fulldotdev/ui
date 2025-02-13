import { imageSchema } from '@/schemas/fields/image'
import { z } from 'astro:content'

export const proofSchema = z
  .object({
    avatar: imageSchema.optional(),
    avatars: imageSchema.array().optional(),
    rating: z.number().optional(),
    text: z.string().optional(),
  })
  .strict()
