import { z } from "astro:schema"

import button from "@/schemas/elements/button"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    pricings: z
      .object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        list: z.string().array(),
        link: link,
        price: z.string(),
        unit: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
