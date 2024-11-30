import { z } from 'astro:content'
import banner from 'fulldev-ui/schemas/components/banner'
import footer from 'fulldev-ui/schemas/components/footer'
import header from 'fulldev-ui/schemas/components/header'
import sidebar from 'fulldev-ui/schemas/components/sidebar'
import subheader from 'fulldev-ui/schemas/components/subheader'
import seo from './fields/seo'

export const layoutSchema = z
  .object({
    theme: z.any(),
    code: z
      .object({
        head: z.string().optional(),
        body: z.string().optional(),
      })
      .optional(),
    seo,
    banner,
    header,
    subheader,
    footer,
    sidebar,
  })
  .strict()
  .nullable()

export type LayoutSchema = z.infer<typeof layoutSchema>
