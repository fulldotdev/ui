import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/fields/button.ts'
import { linkSchema } from 'fulldev-ui/schemas/fields/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/fields/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/fields/menu.ts'

export const headerSchema = z
  .object({
    logo: logoSchema.optional(),
    socials: z.string().array().optional(),
    menus: menuSchema.array().optional(),
    links: linkSchema.array().optional(),
    buttons: buttonSchema.array().optional(),
    search: z.boolean().optional(),
    themer: z.boolean().optional(),
    cart: z.boolean().optional(),
  })
  .strict()

export type HeaderSchema = z.infer<typeof headerSchema>
