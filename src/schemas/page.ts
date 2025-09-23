import { z } from "astro:schema"

import { blockSchema } from "@/schemas/block"
import { seoSchema } from "@/schemas/fields/seo"

export const pageSchema = z.object({
  sections: blockSchema.array().optional(),
  seo: seoSchema.optional(),
})
