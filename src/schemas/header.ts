import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { headingSchema } from 'fulldev-ui/schemas/heading.ts'
import { linkSchema } from 'fulldev-ui/schemas/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { socialSchema } from 'fulldev-ui/schemas/social.ts'

export const headerSchema = z
  .object({
    logo: logoSchema.optional(),
    heading: headingSchema.shape.text,
    links: linkSchema.array().optional(),
    socials: socialSchema.shape.href.array().optional(),
    buttons: buttonSchema.array().optional(),
    menus: menuSchema.array().optional(),
    themer: z.boolean().optional(),
    cart: z.boolean().optional(),
    search: z.boolean().optional(),
  })
  .strict()

export type HeaderSchema = z.infer<typeof headerSchema>
