import { z } from 'astro:content'
import pathSchema from '../utils/pathSchema'
import { badgeSchema } from './badge'
import { buttonSchema } from './button'
import { channelSchema } from './channel'
import { headingSchema } from './heading'
import { iconSchema } from './icon'
import { imageSchema } from './image'
import { linkSchema } from './link'
import { logoSchema } from './logo'
import { menuSchema } from './menu'
import { paragraphSchema } from './paragraph'
import { socialSchema } from './social'
import { taglineSchema } from './tagline'

export const blockSchema = z.object({
  _block: z.string().optional(),
  dark: z.boolean().optional(),
  logo: logoSchema.optional(),
  link: linkSchema.optional(),
  links: linkSchema.array().optional(),
  menus: menuSchema.array().optional(),
  themer: z.boolean().optional(),
  search: z.boolean().optional(),
  cart: z.boolean().optional(),
  text: z.string().optional(),
  tagline: taglineSchema.shape.text,
  badge: badgeSchema.optional(),
  badges: badgeSchema.array().optional(),
  heading: headingSchema.shape.text,
  paragraph: paragraphSchema.shape.text,
  list: z.string().array().optional(),
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
      tagline: taglineSchema.shape.text,
      badge: badgeSchema.optional(),
      badges: badgeSchema.array().optional(),
      heading: headingSchema.shape.text,
      paragraph: paragraphSchema.shape.text,
      list: z.string().array().optional(),
      button: buttonSchema.optional(),
      buttons: buttonSchema.array().optional(),
    })
    .strict()
    .array()
    .optional(),
})

export type BlockSchema = z.infer<typeof blockSchema>
