import { linkSchema } from '@/schemas/components/link'
import { logoSchema } from '@/schemas/components/logo'
import { menuSchema } from '@/schemas/components/menu'
import { z } from 'astro:content'

export const footerSchema = z
  .object({
    class: z.string(),
    logo: logoSchema,
    description: z.string(),
    socials: z.string().array(),
    channels: linkSchema.array(),
    menus: menuSchema.array(),
  })
  .partial()
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>
