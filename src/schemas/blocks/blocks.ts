import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { blocks as blocksRef } from "@/schemas/fields/blocks"
import { html } from "@/schemas/fields/html"
import { links } from "@/schemas/fields/links"
import { size } from "@/schemas/fields/size"
import { variant } from "@/schemas/fields/variant"

export const blocks = z
  .object({
    variant,
    align,
    size,
    html,
    links,
    blocks: blocksRef,
  })
  .partial()
  .strict()
