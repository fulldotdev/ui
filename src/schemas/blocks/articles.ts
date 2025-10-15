import { z } from "astro:schema"

import article from "@/schemas/blocks/article"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    buttons: links,
    articles: z.union([z.string(), article.array()]),
  })
  .partial()
  .strict()
