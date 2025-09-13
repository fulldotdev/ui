import { z } from "astro:schema"

import { articleSchema } from "@/schemas/blocks/article"
import { blogSchema } from "@/schemas/blocks/blog"
import { linkSchema } from "@/schemas/fields/link"

export const articlesSchema = z
  .object({
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linkSchema.array(),
    articles: articleSchema.array(),
  })
  .partial()
  .strict()

export type ArticlesProps = Omit<z.infer<typeof articlesSchema>, "html"> & {
  children?: React.ReactNode
}
