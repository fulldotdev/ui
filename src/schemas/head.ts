import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const headSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    favicon: z.string().optional(),
    company: z.string().optional(),
    code: z.string().optional(),
  })
  .strict()
