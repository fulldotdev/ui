import { z } from "astro:schema"

import banner from "@/schemas/blocks/banner"
import footer from "@/schemas/blocks/footer"
import header from "@/schemas/blocks/header"
import button from "@/schemas/elements/button"
import image from "@/schemas/elements/image"
import section from "@/schemas/section"

export default z
  .object({
    title: z.string(),
    description: z.string(),
    image: image,
    header: header,
    banner: banner,
    sections: section.array(),
    footer: footer,
    bubble: link,
    head: z.string(),
    body: z.string(),
    css: z.string(),
  })
  .partial()
  .strict()
