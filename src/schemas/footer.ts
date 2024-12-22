import { z } from 'astro:content'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'

export const footerSchema = z
  .object({
    logo: logoSchema.optional(),
    heading: z.string().optional(),
    paragraph: z.string().optional(),
    socials: z.string().url().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
  })
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>
