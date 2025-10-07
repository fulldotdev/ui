import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { html } from "@/schemas/fields/html"
import { links } from "@/schemas/fields/links"
import { pages as pagesRef } from "@/schemas/fields/pages"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const pages = z
  .object({
    variant,
    size,
    align,
    html,
    links,
    pages: pagesRef,
  })
  .partial()
  .strict()
