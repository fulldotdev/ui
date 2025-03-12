import { pathSchema } from "@/schemas/misc/path"
import { z } from "astro:content"

export const reviewsSchema = z
  .object({
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    reviews: pathSchema("reviews").array().optional(),
  })
  .strict()
