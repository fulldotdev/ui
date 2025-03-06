import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

export const faqsSchema = z
  .object({
    variant: z.number().optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    content: z.string(),
    buttons: buttonSchema.array(),
    faqs: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
