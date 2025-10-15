import { z } from "astro:schema"

import button from "@/schemas/ui/button"
import html from "@/schemas/ui/html"
import image from "@/schemas/ui/image"
import section from "@/schemas/ui/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    html: html,
    buttons: button.array(),
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
