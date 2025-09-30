import { z } from "astro:schema"

import { linksSchema } from "@/schemas/fields/links"

export const faqsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linksSchema,
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

export const faqsProps = faqsSchema

export type FaqsSchema = z.infer<typeof faqsSchema>
export type FaqsProps = z.infer<typeof faqsProps>
