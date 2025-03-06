import { buttonSchema } from "@/schemas/components/button"
import { z } from "astro:content"

export const faqsSchema = z
  .object({
    level: z.number().optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    faqs: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .strict()
      .array()
      .optional(),
  })
  .strict()
