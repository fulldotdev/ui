import { pathSchema } from "@/schemas/misc/path"
import { z } from "zod"

export const reviewsSchema = z
  .object({
    content: z.string(),
    reviews: pathSchema("projects").array(),
  })
  .partial()
  .strict()
