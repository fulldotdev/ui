import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { description } from "@/schemas/fields/description"
import { html } from "@/schemas/fields/html"
import { link } from "@/schemas/fields/link"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const pricings = z
  .object({
    variant,
    align,
    size,
    html,
    links,
    pricings: z
      .object({
        icon: z.enum(["check", "cross"]),
        title,
        description,
        list: z.string().array(),
        link,
        price: z.string(),
        unit: z.string(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
