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
    posts: reference("posts").array(),
  })
  .partial()
  .strict()

const test = z.object({
  posts: z.union([z.literal("children"), "articles"]),
  postt: z.object({
    posts: z.literal("children"),
  }),
})
