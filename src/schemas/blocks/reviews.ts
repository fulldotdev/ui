import { z } from "astro:schema"

import review from "@/schemas/blocks/review"
import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    html: html,
    buttons: button.array(),
    reviews: z.union([z.string().array(), review.array()]),
  })
  .partial()
  .strict()
