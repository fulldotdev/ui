import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { articles as articlesRef } from "@/schemas/fields/articles"
import { html } from "@/schemas/fields/html"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const articles = z
  .object({
    variant,
    size,
    align,
    html,
    links,
    articles,
  })
  .partial()
  .strict()
