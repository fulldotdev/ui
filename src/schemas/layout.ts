import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { channelSchema } from 'fulldev-ui/schemas/channel.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'

export const layoutSchema = z
  .object({
    _schema: z.string().optional(),
    logo: logoSchema.optional(),
    channels: channelSchema.array().optional(),
    socials: z.string().array().optional(),
    menus: menuSchema.array().optional(),
    links: linkSchema.array().optional(),
    header: z.object({
      block: z.string().optional(),
      logo: logoSchema.optional(),
      links: linkSchema.array().optional(),
      buttons: buttonSchema.array().optional(),
      socials: z.string().array().optional(),
      menus: menuSchema.array().optional(),
      search: z.boolean().optional(),
      themer: z.boolean().optional(),
    }),
    footer: z.object({
      block: z.string().optional(),
      paragraph: z.string().optional(),
      channels: channelSchema.array().optional(),
      socials: z.string().array().optional(),
      links: linkSchema.array().optional(),
      menus: menuSchema.array().optional(),
    }),
    code: z.string().optional(),
    favicon: z.string().optional(),
  })
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
