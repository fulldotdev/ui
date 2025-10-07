import { z } from "astro:schema"

import { image } from "@/schemas/fields/image"
import { links } from "@/schemas/fields/links"
import { socials } from "@/schemas/fields/socials"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const header = z
  .object({
    variant,
    title,
    links,
    socials,
    logo: image,
    menus: z
      .object({
        text: z.string(),
        href: z.string(),
        links,
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
