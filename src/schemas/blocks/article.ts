import { z } from "astro:schema"

import { personProps } from "@/schemas/blocks/person"
import { imageSchema } from "@/schemas/fields/image"
import { referenceProps, referenceSchema } from "@/schemas/fields/reference"

export const articleSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    published: z.date(),
    person: referenceSchema,
  })
  .partial()
  .strict()

export const articleProps = articleSchema
  .extend({
    person: referenceProps.pipe(personProps),
  })
  .partial()
  .strict()

export type ArticleSchema = z.infer<typeof articleSchema>
export type ArticleProps = z.infer<typeof articleProps>
