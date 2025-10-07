import { z } from "astro:schema"

import image from "@/schemas/elements/image"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import socials from "@/schemas/elements/socials"

export default section
  .extend({
    variant: z.enum(["1", "2"]),
    description: z.string(),
    links: links,
    socials: socials,
    logo: image,
    menus: z
      .object({
        text: z.string(),
        links: links,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
