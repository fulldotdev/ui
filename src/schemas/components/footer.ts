import { z } from 'astro:content'
import { channelSchema } from 'fulldev-ui/schemas/components/channel.ts'
import { logoSchema } from 'fulldev-ui/schemas/components/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/components/menu.ts'

export const footerSchema = z
  .object({
    logo: logoSchema.optional(),
    description: z.string().optional(),
    socials: z.string().url().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
  })
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>
