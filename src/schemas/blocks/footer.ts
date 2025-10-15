import { z } from "astro:schema"

import button from "@/schemas/ui/button"
import image from "@/schemas/ui/image"
import link from "@/schemas/ui/link"
import section from "@/schemas/ui/section"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    description: z.string(),
    buttons: button.array(),
    socials: z.string().array(),
    logo: image,
    menus: z
      .object({
        text: z.string(),
        links: link.array(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
