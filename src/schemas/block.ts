import { z } from 'astro:content'
import { badgeSchema } from 'fulldev-ui/schemas/badge.ts'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { headingSchema } from 'fulldev-ui/schemas/heading.ts'
import { iconSchema } from 'fulldev-ui/schemas/icon.ts'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'
import { listSchema } from 'fulldev-ui/schemas/list.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { paragraphSchema } from 'fulldev-ui/schemas/paragraph.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'
import { ratingSchema } from 'fulldev-ui/schemas/rating.ts'
import { socialSchema } from 'fulldev-ui/schemas/social.ts'
import { taglineSchema } from 'fulldev-ui/schemas/tagline.ts'

export const blockSchema = z
  .object({
    _block: z.string().optional(),
    dark: z.boolean().optional(),
    themer: z.boolean().optional(),
    search: z.boolean().optional(),
    cart: z.boolean().optional(),
    text: z.string().optional(),
    content: z.string().optional(),
    logo: logoSchema.optional(),
    link: linkSchema.optional(),
    links: linkSchema.array().optional(),
    menus: menuSchema.array().optional(),
    tagline: taglineSchema.shape.text,
    badge: badgeSchema.optional(),
    badges: badgeSchema.array().optional(),
    heading: headingSchema.shape.text,
    paragraph: paragraphSchema.shape.text,
    list: listSchema.shape.items,
    button: buttonSchema.optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
    images: imageSchema.array().optional(),
    channels: channelSchema.array().optional(),
    socials: socialSchema.shape.href.array().optional(),
    pages: pathSchema('pages').array().optional(),
    products: pathSchema('pages').array().optional(),
    cards: z
      .object({
        image: imageSchema.optional(),
        icon: iconSchema.shape.name,
        rating: ratingSchema.shape.score,
        tagline: taglineSchema.shape.text,
        badge: badgeSchema.optional(),
        badges: badgeSchema.array().optional(),
        heading: headingSchema.shape.text,
        paragraph: paragraphSchema.shape.text,
        list: listSchema.shape.items,
        button: buttonSchema.optional(),
        buttons: buttonSchema.array().optional(),
      })
      .strict()
      .array()
      .optional(),
  })
  .strict()

export type BlockSchema = z.infer<typeof blockSchema>
