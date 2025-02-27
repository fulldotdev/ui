import { linkSchema } from '@/schemas/components/link'
import { logoSchema } from '@/schemas/components/logo'
import { menuSchema } from '@/schemas/components/menu'
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
