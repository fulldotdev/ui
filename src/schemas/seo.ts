import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
  })
  .strict()
