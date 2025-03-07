import { reference, z } from "astro:content"

export const reviewsSchema = z
  .object({
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    reviews: reference("reviews").array().optional(),
  })
  .strict()
