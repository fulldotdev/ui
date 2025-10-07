import { z } from "astro:schema"

import { description } from "@/schemas/fields/description"
import { image } from "@/schemas/fields/image"
import { published } from "@/schemas/fields/published"
import { title } from "@/schemas/fields/title"
import { variant } from "@/schemas/fields/variant"

export const job = z
  .object({
    variant,
    title,
    description,
    image,
    published,
    location: z.any(),
    salary: z.any(),
    hours: z.any(),
  })
  .partial()
  .strict()
