import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import link from "@/schemas/elements/link"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    links: links,
    features: z
      .object({
        image: image,
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        link: link,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
