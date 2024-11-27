import { z } from 'astro:content'
import banner from 'fulldev-ui/schemas/components/banner'
import footer from 'fulldev-ui/schemas/components/footer'
import header from 'fulldev-ui/schemas/components/header'
import image from 'fulldev-ui/schemas/components/image'
import sidebar from 'fulldev-ui/schemas/components/sidebar'
import subheader from 'fulldev-ui/schemas/components/subheader'
import description from 'fulldev-ui/schemas/fields/description'
import title from 'fulldev-ui/schemas/fields/title'

export default z
  .object({
    seo: z
      .object({
        title,
        description,
        image,
      })
      .optional(),
    code: z
      .object({
        head: z.string().optional(),
        body: z.string().optional(),
      })
      .optional(),
    banner,
    header,
    subheader,
    footer,
    sidebar,
  })
  .strict()
