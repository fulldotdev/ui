import { blockSchema } from "@/schemas/block"
import { collectionSchema } from "@/schemas/blocks/collection"
import { contentSchema } from "@/schemas/blocks/content"
import { productSchema } from "@/schemas/blocks/product"
import { imageSchema } from "@/schemas/components/image"
import { seoSchema } from "@/schemas/content/seo"
import { z } from "zod"

export const pageSchema = contentSchema
  .merge(productSchema)
  .merge(collectionSchema)
  .extend({
    title: z.string(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    sections: blockSchema.array().optional(),
    seo: seoSchema.optional(),
    content: z.string().optional(),
  })

export type PageSchema = z.infer<typeof pageSchema>
