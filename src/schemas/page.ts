import { blockSchema } from "@/schemas/block"
import { importSchema } from "@/schemas/fields/import"
import { layoutSchema } from "@/schemas/layout"
import { z } from "zod"

export const pageSchema = layoutSchema
  .merge(blockSchema)
  .extend({
    layout: importSchema.pipe(layoutSchema).or(layoutSchema),
    slug: z.string(),
    sections: importSchema.pipe(blockSchema).or(blockSchema).array(),
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
