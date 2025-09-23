import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"

export const blogSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
  })
  .partial()
  .strict()

export type BlogSchema = z.infer<typeof blogSchema>
