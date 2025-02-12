import { buttonSchema } from '@/schemas/fields/button'
import { logoSchema } from '@/schemas/fields/logo'
import { menuSchema } from '@/schemas/fields/menu'
import { z } from 'astro:content'

export const headerSchema = z
  .object({
    logo: logoSchema.optional(),
    socials: z.string().array().optional(),
    menus: menuSchema.array().optional(),
    buttons: buttonSchema.array().optional(),
    search: z.boolean().optional(),
    themer: z.boolean().optional(),
    cart: z.boolean().optional(),
  })
  .strict()

export type HeaderSchema = z.infer<typeof headerSchema>
