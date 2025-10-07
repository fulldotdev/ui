import { z } from "astro:schema"

import { align } from "@/schemas/fields/align"
import { background } from "@/schemas/fields/background"
import { description } from "@/schemas/fields/description"
import { size } from "@/schemas/fields/size"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const quote = z
  .object({
    variant,
    size,
    align,
    background,
    title,
    description,
  })
  .partial()
  .strict()
