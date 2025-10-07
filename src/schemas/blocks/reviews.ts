import { z } from "astro:schema"

import review from "@/schemas/blocks/review"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    writeup: writeup,
    links: links,
    reviews: z.union([z.string(), review.array()]),
  })
  .partial()
  .strict()
