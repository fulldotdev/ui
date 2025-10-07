import { z } from "astro:schema"

import form from "@/schemas/elements/form"
import image from "@/schemas/elements/image"
import links from "@/schemas/elements/links"
import section from "@/schemas/elements/section"
import socials from "@/schemas/elements/socials"
import writeup from "@/schemas/elements/writeup"

export default section
  .extend({
    variant: z.enum(["1", "2", "3"]),
    writeup: writeup,
    channels: links,
    socials: socials,
    image: image,
    form: form,
  })
  .partial()
  .strict()
