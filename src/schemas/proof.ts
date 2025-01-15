import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const proofSchema = z
  .object({
    rating: z.number().optional(),
    avatars: imageSchema.array().optional(),
    text: z.string().optional(),
  })
  .strict()
