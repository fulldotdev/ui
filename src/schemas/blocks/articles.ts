import { z } from "astro:schema"

import article from "@/schemas/blocks/article"
import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    html: html,
    buttons: button.array(),
    articles: z.union([z.string(), article.array()]),
  })
  .partial()
  .strict()
