import { z } from "astro:schema"

import button from "@/schemas/elements/button"
import image from "@/schemas/elements/image"
import links from "@/schemas/elements/links"
import socials from "@/schemas/elements/socials"

export default z
  .object({
    variant: z.enum(["1", "2"]),
    logo: image,
    buttons: buttons,
    socials: socials,
    menus: link
      .extend({
        buttons: buttons,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
