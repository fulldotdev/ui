import { buttonSchema } from "@/schemas/components/button"
import { reference } from "astro:content"
import { z } from "zod"

export const articlesSchema = z
  .object({
    content: z.string(),
    button: buttonSchema,
    articles: reference("articles").array(),
  })
  .partial()
  .strict()
