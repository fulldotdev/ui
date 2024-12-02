import { z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/components/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { headingSchema } from 'fulldev-ui/schemas/components/heading'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'
import { taglineSchema } from 'fulldev-ui/schemas/components/tagline'
import { paragraphSchema } from '../components/paragraph'

export const heroSchema = z
  .object({
    badge: badgeSchema.optional(),
    tagline: taglineSchema.optional(),
    heading: headingSchema.optional(),
    paragraph: paragraphSchema.optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type HeroSchema = z.infer<typeof heroSchema>
