import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'

export const headerSchema = z
  .object({
    logo: logoSchema.optional(),
    heading: z.string().optional(),
    links: linkSchema.array().optional(),
    socials: z.string().array().optional(),
    buttons: buttonSchema.array().optional(),
    menus: menuSchema.array().optional(),
    themer: z.boolean().optional(),
    cart: z.boolean().optional(),
    search: z.boolean().optional(),
  })
  .strict()

export type HeaderSchema = z.infer<typeof headerSchema>
