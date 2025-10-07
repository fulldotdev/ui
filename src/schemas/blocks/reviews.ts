import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { html } from "@/schemas/fields/html"
import { links } from "@/schemas/fields/links"
import { reviews as reviewsRef } from "@/schemas/fields/reviews"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const reviews = z
  .object({
    variant,
    align,
    size,
    html,
    links,
    reviews: reviewsRef,
  })
  .partial()
  .strict()
