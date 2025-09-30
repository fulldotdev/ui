import { z } from "astro:schema"

import { bannerProps, bannerSchema } from "@/schemas/blocks/banner"
import { footerProps, footerSchema } from "@/schemas/blocks/footer"
import { headerProps, headerSchema } from "@/schemas/blocks/header"
import { imageSchema } from "@/schemas/fields/image"
import { linkSchema } from "@/schemas/fields/link"
import { sectionProps, sectionSchema } from "@/schemas/section"

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

export const layoutProps = layoutSchema
  .extend({
    header: headerProps,
    banner: bannerProps,
    footer: footerProps,
    sections: sectionProps.array(),
  })
  .partial()
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
export type LayoutProps = z.infer<typeof layoutProps>
