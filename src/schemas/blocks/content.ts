import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import links from "@/schemas/elements/links"
import prose from "@/schemas/elements/prose"
import section from "@/schemas/elements/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    prose: prose,
    links: links,
    image: image,
  })
  .partial()
  .strict()
