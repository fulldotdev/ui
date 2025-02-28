import { footerSchema } from '@/schemas/blocks/footer'
import { headerSchema } from '@/schemas/blocks/header'
import { imageSchema } from '@/schemas/components/image'
import { logoSchema } from '@/schemas/components/logo'
import { z } from 'astro:content'

export const layoutSchema = z
  .object({
    lang: z.string(),
    class: z.string(),
    company: z.string(),
    logo: logoSchema,
    header: headerSchema,
    footer: footerSchema,
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    canonical: z.string(),
    noindex: z.boolean(),
    nofollow: z.boolean(),
    css: z.string(),
    head: z.string(),
    body: z.string(),
  })
  .partial()
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
