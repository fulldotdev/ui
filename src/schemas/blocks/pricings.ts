import { z } from "astro:schema"

import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    html: html,
    pricings: z
      .object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        list: z.string().array(),
        button: button,
        price: z.string(),
        unit: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
