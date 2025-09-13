import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const faqsSchema = z
  .object({
    variant: z.enum(["1"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    faqs: z
      .object({
        question: z.string(),
        answer: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()

export type FaqsSchema = z.infer<typeof faqsSchema>

export type FaqsProps = Omit<FaqsSchema, "variant" | "html"> & {
  children?: React.ReactNode
}
