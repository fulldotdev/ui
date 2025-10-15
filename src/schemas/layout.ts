import { z } from "astro:schema"

import banner from "@/schemas/blocks/banner"
import footer from "@/schemas/blocks/footer"
import header from "@/schemas/blocks/header"
import section from "@/schemas/section"
import button from "@/schemas/ui/button"
import image from "@/schemas/ui/image"

export default z
  .object({
    title: z.string(),
    description: z.string(),
    image: image,
    header: header,
    banner: banner,
    sections: section.array(),
    footer: footer,
    bubble: button,
    head: z.string(),
    body: z.string(),
    css: z.string(),
  })
  .partial()
  .strict()
