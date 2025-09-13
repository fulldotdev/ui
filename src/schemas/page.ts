import { z } from "astro:schema"

import { blockSchema } from "@/schemas/block"
import { imageSchema } from "@/schemas/fields/image"

export const pageSchema = z
  .object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    sections: blockSchema.array(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .strict(),
  })
  .partial()
  .strict()
