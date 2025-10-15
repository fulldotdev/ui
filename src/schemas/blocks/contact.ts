import { z } from "astro:schema"

import button from "@/schemas/ui/button"
import form from "@/schemas/ui/form"
import html from "@/schemas/ui/html"
import image from "@/schemas/ui/image"
import section from "@/schemas/ui/section"
import socials from "@/schemas/ui/socials"

export default section
  .extend({
    variant: z.enum(["1", "2", "3"]),
    html: html,
    channels: button.array(),
    socials: socials,
    image: image,
    form: form,
  })
  .partial()
  .strict()
