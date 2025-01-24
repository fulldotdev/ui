import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/fields/image.ts'

export const proofSchema = z
  .object({
    avatar: imageSchema.optional(),
    avatars: imageSchema.array().optional(),
    rating: z.number().optional(),
    text: z.string().optional(),
  })
  .strict()
