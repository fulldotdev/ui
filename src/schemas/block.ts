import { z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'

export const blockSchema = z
  .object({
    _block: z.string().optional(),
    dark: z.boolean().optional(),
    themer: z.boolean().optional(),
    search: z.boolean().optional(),
    cart: z.boolean().optional(),
    text: z.string().optional(),
    content: z.string().optional(),
    tagline: z.string().optional(),
    heading: z.string().optional(),
    paragraph: z.string().optional(),
    list: z.string().array().optional(),
    socials: z.string().array().optional(),
    logo: logoSchema.optional(),
    link: linkSchema.optional(),
    links: linkSchema.array().optional(),
    menus: menuSchema.array().optional(),
    sidebar: menuSchema.array().optional(),
    badge: badgeSchema.optional(),
    badges: badgeSchema.array().optional(),
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    channels: channelSchema.array().optional(),
    pages: pathSchema('pages').array().optional(),
    products: pathSchema('pages').array().optional(),
    cards: z
      .object({
        icon: z.string().optional(),
        rating: z.number().optional(),
        tagline: z.string().optional(),
        heading: z.string().optional(),
        paragraph: z.string().optional(),
        list: z.string().array().optional(),
        badge: badgeSchema.optional(),
        badges: badgeSchema.array().optional(),
        button: buttonSchema.optional(),
        buttons: buttonSchema.array().optional(),
        image: imageSchema.optional(),
      })
      .strict()
      .array()
      .optional(),
    proof: z
      .object({
        rating: z.number().optional(),
        images: imageSchema.array().optional(),
        text: z.string().optional(),
      })
      .optional(),
  })
  .strict()

export type BlockSchema = z.infer<typeof blockSchema>
