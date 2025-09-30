import { z } from "astro:schema"

import { articleProps } from "@/schemas/blocks/article"
import { linksSchema } from "@/schemas/fields/links"
import { referencesProps, referencesSchema } from "@/schemas/fields/references"

export const articlesSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linksSchema,
    articles: referencesSchema,
  })
  .partial()
  .strict()

export const articlesProps = articlesSchema.extend({
  articles: referencesProps.pipe(articleProps.array()),
})

export type ArticlesSchema = z.infer<typeof articlesSchema>
export type ArticlesProps = z.infer<typeof articlesProps>
