import { collectionSchema } from "@/schemas/blocks/collection"
import { contentSchema } from "@/schemas/blocks/content"
import { postSchema } from "@/schemas/blocks/post"
import { productSchema } from "@/schemas/blocks/product"
import { sectionSchema } from "@/schemas/misc/section"
import { seoSchema } from "@/schemas/misc/seo"
import { z } from "zod"

import { pathSchema } from "./path"

export const pageSchema = z
  .object({
    type: z
      .enum(["page", "post", "location", "person", "product", "collection"])
      .default("page"),
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
