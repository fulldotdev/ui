import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { description } from "@/schemas/fields/description"
import { html } from "@/schemas/fields/html"
import { image } from "@/schemas/fields/image"
import { link } from "@/schemas/fields/link"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const features = z
  .object({
    variant,
    align,
    size,
    title,
    description,
    html,
    links,
    features: z
      .object({
        image,
        icon: z.enum(["check", "cross"]),
        title,
        description,
        link,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
