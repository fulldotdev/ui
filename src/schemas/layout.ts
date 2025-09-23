import { z } from "astro:schema"

import { blockSchema } from "@/schemas/block"
import { bannerSchema } from "@/schemas/blocks/banner"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { linkSchema } from "@/schemas/fields/link"
import { seoSchema } from "@/schemas/fields/seo"

export const layoutSchema = z
  .object({
    header: headerSchema,
    banner: bannerSchema,
    sections: blockSchema.array(),
    footer: footerSchema,
    bubble: linkSchema,
    head: z.string(),
    body: z.string(),
    css: z.string(),
    seo: seoSchema,
  })
  .partial()
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
