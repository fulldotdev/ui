import { buttonSchema } from "@/schemas/components/button"
import { z } from "zod"

export const faqsSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    faqs: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .array()
      .optional(),
  })
  .passthrough()

export type FaqsProps = z.infer<typeof faqsSchema>
