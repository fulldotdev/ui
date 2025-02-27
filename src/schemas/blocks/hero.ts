import { badgeSchema } from '@/schemas/components/badge'
import { buttonSchema } from '@/schemas/components/button'
import { imageSchema } from '@/schemas/components/image'
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
