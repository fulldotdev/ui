import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

export const ctaSchema = z
  .object({
    variant: z.number().optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    content: z.string(),
    buttons: buttonSchema.array(),
  })
  .partial()
  .strict()
