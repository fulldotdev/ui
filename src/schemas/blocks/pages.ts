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
    pages: z
      .string()
      .array()
      .or(
        z
          .object({
            title: z.string(),
            description: z.string(),
            image: image,
          })
          .array()
      ),
  })
  .partial()
  .strict()
