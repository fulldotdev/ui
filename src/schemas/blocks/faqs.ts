import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { html } from "@/schemas/fields/html"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const faqs = z
  .object({
    variant,
    align,
    size,
    html,
    links,
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
