import { z } from "astro:schema"

import { personSchema } from "@/schemas/blocks/person"
import { imageSchema } from "@/schemas/fields/image"

export const articleSchema = z
  .object({
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    published: z.date(),
    person: personSchema,
  })
  .partial()
  .strict()

export type ArticleProps = z.infer<typeof articleSchema> & {
  children?: React.ReactNode
}
