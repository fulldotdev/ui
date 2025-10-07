import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { form } from "@/schemas/fields/form"
import { html } from "@/schemas/fields/html"
import { image } from "@/schemas/fields/image"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { socials } from "@/schemas/fields/socials"
import { variant3 } from "@/schemas/fields/variant"

export const contact = z
  .object({
    variant: variant3,
    align,
    size,
    html,
    channels: links,
    socials,
    image,
    form,
  })
  .partial()
  .strict()
