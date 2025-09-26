import { z } from "astro:schema"

import { seoSchema } from "@/schemas/fields/seo"
import { sectionSchema } from "@/schemas/section"

export const pageSchema = z
  .object({
    sections: sectionSchema.array(),
    seo: seoSchema,
  })
  .partial()
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
