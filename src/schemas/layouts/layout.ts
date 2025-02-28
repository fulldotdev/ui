import { footerSchema } from '@/schemas/blocks/footer'
import { headerSchema } from '@/schemas/blocks/header'
import { imageSchema } from '@/schemas/components/image'
import { logoSchema } from '@/schemas/components/logo'
import { z } from 'astro:content'

export const layoutSchema = z
  .object({
    lang: z.string().nullish(),
    class: z.string().nullish(),
    company: z.string().nullish(),
    logo: logoSchema.nullish(),
    header: headerSchema.nullish(),
    footer: footerSchema.nullish(),
    title: z.string().nullish(),
    description: z.string().nullish(),
    image: imageSchema.nullish(),
    canonical: z.string().nullish(),
    noindex: z.boolean().nullish(),
    nofollow: z.boolean().nullish(),
    css: z.string().nullish(),
    head: z.string().nullish(),
    body: z.string().nullish(),
  })
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
