import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

export const ctaSchema = z
  .object({
    content: z.string(),
    buttons: buttonSchema.array(),
  })
  .partial()
  .strict()
