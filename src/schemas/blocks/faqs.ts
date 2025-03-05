import { buttonSchema } from "@/schemas/components/button"
import { z } from "zod"

export const faqsSchema = z
  .object({
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
