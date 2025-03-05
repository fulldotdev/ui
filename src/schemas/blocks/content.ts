import { buttonSchema } from "@/schemas/components/button"
import { imageSchema } from "@/schemas/components/image"
import { z } from "astro:content"

export const contentSchema = z
  .object({
    size: z.enum(["default", "lg", "xl"]),
    align: z.enum(["start", "center", "end"]),
    content: z.string(),
    buttons: buttonSchema.array(),
    image: imageSchema,
  })
  .partial()
  .strict()
