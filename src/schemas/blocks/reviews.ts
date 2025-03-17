import { buttonSchema } from "@/schemas/components/button"
import { z } from "zod"

export const reviewsSchema = z.object({
  className: z.string().optional(),
  level: z.number().min(1).max(3).optional(),
  align: z.enum(["start", "center", "end"]).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  buttons: buttonSchema.array().optional(),
  reviews: z
    .object({
      rating: z.number().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .array()
    .optional(),
})

export type ReviewsProps = z.infer<typeof reviewsSchema>
