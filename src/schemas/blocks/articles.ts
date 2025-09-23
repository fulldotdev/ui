import { z } from "astro:schema"

import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const articlesSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linkSchema.array(),
    articles: pathSchema("articles").array(),
    blog: pathSchema("blogs"),
  })
  .partial()
  .strict()

export type ArticlesSchema = z.infer<typeof articlesSchema>
