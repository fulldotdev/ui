import { z } from "astro:schema"

import { description } from "@/schemas/fields/description"
import { image } from "@/schemas/fields/image"
import { links } from "@/schemas/fields/links"
import { socials } from "@/schemas/fields/socials"
import { variant } from "@/schemas/fields/variant"

export const footer = z
  .object({
    variant,
    description,
    links,
    socials,
    logo: image,
    menus: z
      .object({
        text: z.string(),
        links,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
