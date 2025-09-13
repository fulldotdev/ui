import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"

export const faqsSchema = z
  .object({
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

export type FaqsProps = Omit<z.infer<typeof faqsSchema>, "html"> & {
  children?: React.ReactNode
}
