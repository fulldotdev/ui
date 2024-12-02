import { z } from 'astro:content'
import { channelSchema } from 'fulldev-ui/schemas/components/channel.ts'
import { logoSchema } from 'fulldev-ui/schemas/components/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/components/menu.ts'
import { headingSchema } from './heading'
import { paragraphSchema } from './paragraph'

export const footerSchema = z
  .object({
    logo: logoSchema.optional(),
    heading: headingSchema.shape.text,
    paragraph: paragraphSchema.shape.text,
    socials: z.string().url().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
  })
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>
