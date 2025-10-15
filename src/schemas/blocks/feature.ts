import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    buttons: links,
    image: image,
  })
  .partial()
  .strict()
