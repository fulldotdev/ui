import { buttonSchema } from '@/schemas/fields/button'
import { logoSchema } from '@/schemas/fields/logo'
import { menuSchema } from '@/schemas/fields/menu'
import { z } from 'astro:content'

export const headerSchema = z
  .object({
    logo: logoSchema.nullish(),
    socials: z.string().array().nullish(),
    menus: menuSchema.array().nullish(),
    buttons: buttonSchema.array().nullish(),
    search: z.boolean().nullish(),
    themer: z.boolean().nullish(),
    cart: z.boolean().nullish(),
  })
  .strict()

export type HeaderSchema = z.infer<typeof headerSchema>
