import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { background } from "@/schemas/fields/background"
import { html } from "@/schemas/fields/html"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const cta = z
  .object({
    variant,
    align,
    size,
    background,
    html,
    links,
  })
  .partial()
  .strict()
