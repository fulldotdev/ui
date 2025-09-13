import { z } from "astro:schema"

import { reviewSchema } from "@/schemas/blocks/review"
import { linkSchema } from "@/schemas/fields/link"

export const reviewsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linkSchema.array(),
    reviews: reviewSchema.array(),
  })
  .partial()
  .strict()

export type ReviewsProps = Omit<z.infer<typeof reviewsSchema>, "html"> & {
  children?: React.ReactNode
}
