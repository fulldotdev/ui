import { z } from 'astro:content'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { headingSchema } from 'fulldev-ui/schemas/heading.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { paragraphSchema } from 'fulldev-ui/schemas/paragraph.ts'

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
