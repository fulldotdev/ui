import { buttonSchema } from '@/schemas/components/button'
import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const heroSchema = z
  .object({
    size: z.enum(['lg', 'xl', '2xl']),
    align: z.enum(['start', 'center', 'end']),
    dark: z.boolean().optional(),
    content: z.string(),
    buttons: buttonSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()
