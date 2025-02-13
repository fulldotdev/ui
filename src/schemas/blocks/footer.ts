import { channelSchema } from '@/schemas/fields/channel'
import { logoSchema } from '@/schemas/fields/logo'
import { menuSchema } from '@/schemas/fields/menu'
import { z } from 'astro:content'

export const footerSchema = z
  .object({
    logo: logoSchema.optional(),
    description: z.string().optional(),
    socials: z.string().array().optional(),
    channels: channelSchema.array().optional(),
    menus: menuSchema.array().optional(),
  })
  .strict()

export type FooterSchema = z.infer<typeof footerSchema>
