import { z } from 'astro:content'
import { imageSchema } from './fields/image'
import { metaSchema } from './fields/meta'
import { footerSchema } from './globals/footer'
import { headerSchema } from './globals/header'

export const settingSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    meta: metaSchema.optional(),
    header: headerSchema.optional(),
    footer: footerSchema.optional(),
  })
  .strict()

export type SettingSchema = z.infer<typeof settingSchema>
