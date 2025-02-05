import { z } from 'astro:content'
import { channelSchema } from 'fulldev-ui/schemas/fields/channel.ts'
import { logoSchema } from 'fulldev-ui/schemas/fields/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/fields/menu.ts'

export const footerSchema = z
  .object({
    logo: logoSchema.optional(),
    description: z.string().optional(),
    socials: z.string().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
    text: z.string().optional(),
  })
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>
