import { z } from "astro:schema"

import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    html: html,
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
