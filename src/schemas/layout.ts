import { z } from "astro:schema"

import { blockSchema } from "@/schemas/block"
import { linkSchema } from "@/schemas/fields/link"
import { seoSchema } from "@/schemas/fields/seo"

export const layoutSchema = z
  .object({
    headers: blockSchema.array(),
    sections: blockSchema.array(),
    footers: blockSchema.array(),
    bubble: linkSchema,
    head: z.string(),
    body: z.string(),
    css: z.string(),
    seo: seoSchema,
  })
  .partial()
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
