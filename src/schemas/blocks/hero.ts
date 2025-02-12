import { buttonSchema } from '@/schemas/fields/button'
import { z } from 'astro:content'
import { badgeSchema } from '../fields/badge'
import { imageSchema } from '../fields/image'

export const heroSchema = z
  .object({
    badge: badgeSchema.optional(),
    writeup: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type HeroSchema = z.infer<typeof heroSchema>
