import { z } from "zod"

export const reviewSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
  })
  .passthrough()

export type ReviewProps = z.infer<typeof reviewSchema>
