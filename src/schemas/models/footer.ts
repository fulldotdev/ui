import { linkSchema } from '@/schemas/fields/link'
import { logoSchema } from '@/schemas/fields/logo'
import { menuSchema } from '@/schemas/fields/menu'
import { z } from 'astro:content'

export const footerSchema = z
  .object({
    logo: logoSchema.nullish(),
    description: z.string().nullish(),
    socials: z.string().array().nullish(),
    channels: linkSchema.array().nullish(),
    menus: menuSchema.array().nullish(),
  })
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>
