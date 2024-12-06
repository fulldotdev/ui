import { z } from 'astro:content'
import { bannerSchema } from 'fulldev-ui/schemas/blocks/banner.ts'
import { footerSchema } from 'fulldev-ui/schemas/components/footer.ts'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { headerSchema } from 'fulldev-ui/schemas/components/header.ts'
import { linkSchema } from 'fulldev-ui/schemas/components/link.ts'
import { navigationSchema } from 'fulldev-ui/schemas/components/navigation.ts'
import { sidebarSchema } from 'fulldev-ui/schemas/components/sidebar.ts'

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
