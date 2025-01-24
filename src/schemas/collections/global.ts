import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/fields/button.ts'
import { channelSchema } from 'fulldev-ui/schemas/fields/channel.ts'
import { linkSchema } from 'fulldev-ui/schemas/fields/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/fields/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/fields/menu.ts'

export const globalSchema = z
  .object({
    block: z.string().optional(),
    company: z.string().optional(),
    logo: logoSchema.optional(),
    channels: channelSchema.array().optional(),
    socials: z.string().array().optional(),
    menus: menuSchema.array().optional(),
    links: linkSchema.array().optional(),
    favicon: z.string().optional(),
    text: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    search: z.boolean().optional(),
    themer: z.boolean().optional(),
    cart: z.boolean().optional(),
    paragraph: z.string().optional(),
    button: buttonSchema.optional(),
  })
  .strict()

export type GlobalSchema = z.infer<typeof globalSchema>
