import { z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const cardSchema = z
  .object({
    href: z.string().optional(),
    badge: badgeSchema.optional(),
    badges: badgeSchema.array().optional(),
    tagline: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    list: z.string().array().optional(),
    socials: z.string().array().optional(),
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    price: z.number().optional(),
    icon: z.string().optional(),
    rating: z.number().optional(),
    avatar: imageSchema.optional(),
    avatars: imageSchema.array().optional(),
    soldout: z.boolean().optional(),
  })
  .strict()
