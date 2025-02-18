import { badgeSchema } from '@/schemas/fields/badge'
import { buttonSchema } from '@/schemas/fields/button'
import { imageSchema } from '@/schemas/fields/image'
import { z } from 'astro:content'

export const heroSchema = z
  .object({
    badge: badgeSchema.nullish(),
    writeup: z.string().nullish(),
    buttons: buttonSchema.array().nullish(),
    image: imageSchema.nullish(),
  })
  .strict()

export type HeroSchema = z.infer<typeof heroSchema>
