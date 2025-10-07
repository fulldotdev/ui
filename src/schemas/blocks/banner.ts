import { z } from "astro:schema"

import { html } from "@/schemas/fields/html"
import { variant } from "@/schemas/fields/variant"

export const banner = z
  .object({
    variant,
    html,
  })
  .partial()
  .strict()
