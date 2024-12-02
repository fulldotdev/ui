import { z } from 'astro:content'
import { footerSchema } from 'fulldev-ui/schemas/components/footer'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { headerSchema } from 'fulldev-ui/schemas/components/header'
import { linkSchema } from 'fulldev-ui/schemas/components/link.ts'
import { sidebarSchema } from 'fulldev-ui/schemas/components/sidebar'
import { bannerSchema } from './blocks/banner'
import { navigationSchema } from './components/navigation'

export const layoutSchema = z
  .object({
    head: headSchema.optional(),
    banner: bannerSchema.optional(),
    navigation: navigationSchema.optional(),
    header: headerSchema.optional(),
    subheader: linkSchema.array().optional(),
    sidebar: sidebarSchema.optional(),
    footer: footerSchema.optional(),
  })
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
