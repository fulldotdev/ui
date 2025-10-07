import { z } from "astro:schema"

import { description } from "@/schemas/fields/description"
import { image } from "@/schemas/fields/image"
import { tagline } from "@/schemas/fields/tagline"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const review = z
  .object({
    variant,
    title,
    description,
    tagline,
    rating: z.number().min(1).max(5),
    image,
  })
  .partial()
  .strict()
