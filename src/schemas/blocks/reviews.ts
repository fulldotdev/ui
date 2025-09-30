import { z } from "astro:schema"

import { reviewProps } from "@/schemas/blocks/review"
import { linksSchema } from "@/schemas/fields/links"
import { referencesProps, referencesSchema } from "@/schemas/fields/references"

export const reviewsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linksSchema,
    reviews: referencesSchema,
  })
  .partial()
  .strict()

export const reviewsProps = reviewsSchema.extend({
  reviews: referencesProps.pipe(reviewProps.array()),
})

export type ReviewsSchema = z.infer<typeof reviewsSchema>
export type ReviewsProps = z.infer<typeof reviewsProps>
