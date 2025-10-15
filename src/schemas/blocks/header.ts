import { z } from "astro:schema"

import button from "@/schemas/ui/button"
import image from "@/schemas/ui/image"
import link from "@/schemas/ui/link"

export default z
  .object({
    variant: z.enum(["1", "2"]),
    logo: image,
    buttons: button.array(),
    socials: z.string().array(),
    menus: link
      .extend({
        links: link.array(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
