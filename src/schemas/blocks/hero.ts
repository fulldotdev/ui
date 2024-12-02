import { z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/components/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const heroSchema = z
  .object({
    _block: z.string(),
    badge: badgeSchema,
    tagline: z.string().optional(),
    heading: z.string().optional(),
    text: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type HeroSchema = z.infer<typeof heroSchema>
