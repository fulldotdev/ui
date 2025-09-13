import { z } from "astro:schema"

import type { PersonProps } from "@/schemas/blocks/person"
import { imageSchema } from "@/schemas/fields/image"
import { pathSchema } from "@/schemas/fields/path"

export const articleSchema = z
  .object({
    variant: z.enum(["1"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    published: z.date(),
    person: pathSchema("persons"),
    blog: pathSchema("blogs"),
  })
  .partial()
  .strict()

export type ArticleSchema = z.infer<typeof articleSchema>

export type ArticleProps = Omit<ArticleSchema, "variant" | "person"> & {
  children?: React.ReactNode
  person?: PersonProps
}
