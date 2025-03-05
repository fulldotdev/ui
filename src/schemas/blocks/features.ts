import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

export const featuresSchema = z
  .object({
    size: z.enum(["default", "lg", "xl"]),
    align: z.enum(["start", "center", "end"]),
    content: z.string(),
    buttons: buttonSchema.array().optional(),
    features: z
      .object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
