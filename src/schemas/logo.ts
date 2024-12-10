import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const logoSchema = z
  .object({
    image: imageSchema,
    text: z.string().optional(),
    href: z.string().optional(),
    size: z.enum(['sm', 'md', 'lg']).default('md').optional(),
  })
  .strict()

export type LogoSchema = z.infer<typeof logoSchema>
