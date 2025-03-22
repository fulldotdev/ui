import { collectionSchema } from "@/schemas/blocks/collection"
import { contentSchema } from "@/schemas/blocks/content"
import { productSchema } from "@/schemas/blocks/product"
import { sectionSchema } from "@/schemas/content/section"
import { seoSchema } from "@/schemas/content/seo"
import { z } from "zod"

export const pageSchema = contentSchema
  .merge(productSchema)
  .merge(collectionSchema)
  .extend({
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
    body: z.string().optional(),
  })

export type PageSchema = z.infer<typeof pageSchema>
