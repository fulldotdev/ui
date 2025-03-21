import { collectionSchema } from "@/schemas/blocks/collection"
import { contentSchema } from "@/schemas/blocks/content"
import { postSchema } from "@/schemas/blocks/post"
import { productSchema } from "@/schemas/blocks/product"
import { pathSchema } from "@/schemas/misc/path"
import { sectionSchema } from "@/schemas/misc/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "zod"

export const pageSchema = z
  .object({
    type: z
      .enum([
        "content",
        "page",
        "post",
        "location",
        "person",
        "product",
        "collection",
      ])
      .default("content"),
    variant: z.number().default(1),
    layout: pathSchema("layouts").default("base"),
    collections: pathSchema("pages").array().optional(),
    products: pathSchema("pages").array().optional(),
    sections: sectionSchema.array().optional(),
    seo: seoSchema.optional(),
  })
  .merge(contentSchema)
  .merge(postSchema)
  .merge(productSchema)
  .merge(collectionSchema)
  .passthrough()

export type PageProps = z.infer<typeof pageSchema>
