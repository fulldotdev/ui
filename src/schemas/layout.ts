import { z } from "astro:schema"

import { blockSchema } from "@/schemas/block"
import { linkSchema } from "@/schemas/fields/link"

export const layoutSchema = z
  .object({
    headers: blockSchema.array(),
    footers: blockSchema.array(),
    bubble: linkSchema,
  })
  .partial()
  .strict()
