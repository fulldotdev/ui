import { buttonSchema } from "@/schemas/components/button"
import { reference, z } from "astro:content"

export const articlesSchema = z
  .object({
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["xs", "sm", "md", "lg", "xl", "2xl"]),
    title: z.string(),
    description: z.string(),
    content: z.string(),
    buttons: buttonSchema.array(),
    articles: reference("articles").array(),
  })
  .partial()
  .strict()
