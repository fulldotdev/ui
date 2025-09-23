import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { pathSchema } from "@/schemas/fields/path"

export const articleSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    title: z.string(),
    description: z.string(),
    published: z.date(),
    image: imageSchema,
    person: pathSchema("persons"),
  })
  .partial()
  .strict()

export type ArticleSchema = z.infer<typeof articleSchema>
