import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { html } from "@/schemas/fields/html"
import { image } from "@/schemas/fields/image"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const content = z
  .object({
    variant,
    size,
    align,
    html,
    links,
    image,
  })
  .partial()
  .strict()
