import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"
import { pathSchema } from "@/schemas/fields/path"

export const blogSchema = z.object({
  variant: z.enum(["1"]),
  id: z.string(),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  title: z.string(),
  description: z.string(),
  image: imageSchema,
  articles: pathSchema("articles").array(),
})

export type BlogSchema = z.infer<typeof blogSchema>

export type BlogProps = Omit<BlogSchema, "variant" | "html"> & {
  children?: React.ReactNode
}
