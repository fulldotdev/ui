import { channelSchema } from '@/schemas/fields/channel.ts'
import { logoSchema } from '@/schemas/fields/logo.ts'
import { menuSchema } from '@/schemas/fields/menu.ts'
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
