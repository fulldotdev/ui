import { z } from "astro:schema"

import review from "@/schemas/blocks/review"
import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    html: html,
    buttons: button.array(),
    reviews: z.union([z.string(), review.array()]),
  })
  .partial()
  .strict()
