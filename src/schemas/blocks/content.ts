import { z } from "astro:schema"

import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import image from "@/schemas/ui/image"
import section from "@/schemas/ui/section"

export default section
  .extend({
    block: z.enum(["1", "2"]),
    html: html,
    buttons: button.array(),
    image: image,
  })
  .partial()
  .strict()
