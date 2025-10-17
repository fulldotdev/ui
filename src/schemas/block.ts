import { z } from "astro:schema"

import banner from "@/schemas/blocks/banner"
import footer from "@/schemas/blocks/footer"
import header from "@/schemas/blocks/header"
import page from "@/schemas/page"
import section from "@/schemas/section"

export default z.discriminatedUnion("type", [
  ...section.options,
  ...page.options,
  z.object({
    type: z.literal("header"),
    ...header.shape,
  }),
  z.object({
    type: z.literal("banner"),
    ...banner.shape,
  }),
  z.object({
    type: z.literal("footer"),
    ...footer.shape,
  }),
])
