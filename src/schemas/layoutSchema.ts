import { z } from 'astro:content'
import { footerSchema } from 'fulldev-ui/schemas/components/footer'
import { headSchema } from 'fulldev-ui/schemas/components/head.ts'
import { headerSchema } from 'fulldev-ui/schemas/components/header'
import { linkSchema } from 'fulldev-ui/schemas/components/link.ts'
import { sidebarSchema } from 'fulldev-ui/schemas/components/sidebar'

export const layoutSchema = z
  .object({
    head: headSchema.optional(),
    banner: z.string().optional(),
    header: headerSchema.optional(),
    subheader: linkSchema.array().optional(),
    sidebar: sidebarSchema.optional(),
    footer: footerSchema.optional(),
  })
  .strict()
  .nullable()

export type LayoutSchema = z.infer<typeof layoutSchema>
