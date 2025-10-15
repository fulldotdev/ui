import { z } from "astro:schema"

import product from "@/schemas/blocks/product"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    buttons: buttons,
    products: z.union([z.string(), product.array()]),
  })
  .partial()
  .strict()
