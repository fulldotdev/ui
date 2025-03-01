import { badgeSchema } from '@/schemas/components/badge'
import { buttonSchema } from '@/schemas/components/button'
import { imageSchema } from '@/schemas/components/image'
import { z } from 'astro:content'

export const heroSchema = z
  .object({
    badge: badgeSchema,
    content: z.string(),
    buttons: buttonSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()
