import { z } from "astro:schema"

import type { ArticleProps } from "@/schemas/blocks/article"
import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const articlesSchema = z.object({
  variant: z.enum(["1"]),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  links: linkSchema.array(),
  blog: pathSchema("blogs"),
  articles: pathSchema("articles").array(),
})

export type ArticlesSchema = z.infer<typeof articlesSchema>

export type ArticlesProps = Omit<
  ArticlesSchema,
  "variant" | "html" | "blog" | "articles"
> & {
  children?: React.ReactNode
  articles?: ArticleProps[]
}
