import { z } from "astro:schema"

import product from "@/schemas/blocks/product"
import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    html: html,
    buttons: button.array(),
    products: z.union([z.string().array(), product.array()]),
  })
  .partial()
  .strict()
