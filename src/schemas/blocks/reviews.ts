import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const reviewsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    reviews: pathSchema.array(),
  })
  .partial()
  .strict()

export type ReviewsSchema = z.infer<typeof reviewsSchema>
