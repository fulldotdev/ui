import { z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { proofSchema } from 'fulldev-ui/schemas/proof.ts'

export const cardSchema = z
  .object({
    target: z.string().optional(),
    href: z.string().optional(),
    order: z.number().optional(),
    text: z.string().optional(),
    content: z.string().optional(),
    badge: badgeSchema.optional(),
    tagline: z.string().optional(),
    heading: z.string().optional(),
    paragraph: z.string().optional(),
    list: z.string().array().optional(),
    socials: z.string().array().optional(),
    logo: logoSchema.optional(),
    link: linkSchema.optional(),
    links: linkSchema.array().optional(),
    menus: menuSchema.array().optional(),
    badges: z.string().array().optional(),
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    channels: channelSchema.array().optional(),
    proof: proofSchema.optional(),
    price: z.number().optional(),
    icon: z.string().optional(),
    rating: z.number().optional(),
    avatar: imageSchema.optional(),
    avatars: imageSchema.array().optional(),
    soldout: z.boolean().optional(),
  })
  .strict()
