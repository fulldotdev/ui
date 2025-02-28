import { buttonSchema } from '@/schemas/components/button'
import { logoSchema } from '@/schemas/components/logo'
import { menuSchema } from '@/schemas/components/menu'
import { z } from 'astro:content'

export const headerSchema = z
  .object({
    class: z.string(),
    logo: logoSchema,
    socials: z.string().array(),
    menus: menuSchema.array(),
    buttons: buttonSchema.array(),
    search: z.boolean(),
    themer: z.boolean(),
    cart: z.boolean(),
  })
  .partial()
  .strict()

export type HeaderSchema = z.infer<typeof headerSchema>
