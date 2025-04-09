import { blockSchema } from "@/schemas/block"
import { z } from "zod"

import { referenceSchema } from "./fields/reference"

export const pageSchema = blockSchema
  .extend({
    type: z.string(),
    variant: z.number(),
    slug: z.string(),
    lang: z.string(),
    company: z.string(),
    banner: blockSchema,
    header: blockSchema,
    sections: blockSchema.array(),
    footer: blockSchema,
    head: z.string(),
    body: z.string(),
    css: z.string(),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .partial()
      .optional(),
  })
  .partial()
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
