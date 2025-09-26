import { z } from "astro:schema"

import { bannerSchema } from "@/schemas/blocks/banner"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { sectionSchema } from "@/schemas/section"

export const layoutSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    header: headerSchema,
    banner: bannerSchema,
    sections: sectionSchema.array(),
    footer: footerSchema,
    bubble: linkSchema,
    head: z.string(),
    body: z.string(),
    css: z.string(),
  })
  .partial()
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
