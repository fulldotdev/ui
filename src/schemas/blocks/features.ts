import { z } from "astro:schema"

import button from "@/schemas/elements/button"
import image from "@/schemas/elements/image"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    writeup: writeup,
    buttons: buttons,
    features: z
      .object({
        image: image,
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        button: button,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
