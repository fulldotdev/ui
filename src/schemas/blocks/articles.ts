import { buttonSchema } from "@/schemas/components/button"
import { reference, z } from "astro:content"

export const articlesSchema = z
  .object({
    content: z.string(),
    button: buttonSchema,
    articles: reference("articles").array(),
  })
  .partial()
  .strict()
