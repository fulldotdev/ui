import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { linkSchema } from 'fulldev-ui/schemas/components/link.ts'
import { logoSchema } from 'fulldev-ui/schemas/components/logo.ts'
import { menuSchema } from 'fulldev-ui/schemas/components/menu.ts'

export const headerSchema = z
  .object({
    themer: z.boolean().optional(),
    logo: logoSchema.optional(),
    links: linkSchema.array().optional(),
    buttons: buttonSchema.array().optional(),
    menus: menuSchema.array().optional(),
  })
  .strict()

export type HeaderSchema = z.infer<typeof headerSchema>
