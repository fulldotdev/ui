import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"

export const seoSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: imageSchema,
  })
  .partial()
  .strict()
