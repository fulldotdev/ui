import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import link from "@/schemas/elements/link"
import links from "@/schemas/elements/links"
import socials from "@/schemas/elements/socials"

export default z
  .object({
    variant: z.enum(["1", "2"]),
    logo: image,
    buttons: links,
    socials: socials,
    menus: link
      .extend({
        buttons: links,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
