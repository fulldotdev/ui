import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const headSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    theme: z.enum(['light', 'dark', 'system']).default('light').optional(),
    favicon: z.string().optional(),
    company: z.string().optional(),
    scripts: z.string().array().optional(),
  })
  .strict()

export type HeadSchema = z.infer<typeof headSchema>
