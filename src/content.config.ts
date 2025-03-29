import { blockSchema } from "@/schemas/block"
import { itemSchema } from "@/schemas/item"
import { pageSchema } from "@/schemas/page"
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "zod"

// Helper schema for content file references with auto-loaded frontmatter
export const pathSchema = z
  .string()
  .transform(async (path) => {
    const contentPath = path.split("content/")[1]
    const collection = contentPath.split("/")[0]
    const filePath = contentPath.split("/").slice(1).join("/")
    const id = filePath.split(".")[0]

    return {
      collection,
      id,
    }
  })
  .pipe(
    z.object({
      collection: z.string(),
      id: z.string(),
    })
  )

const itemOrPath = z.union([pathSchema, itemSchema])

const block = blockSchema.extend({
  type: z.enum([
    "collection",
    "collections",
    "contact",
    "content",
    "cta",
    "faqs",
    "features",
    "footer",
    "header",
    "hero",
    "locations",
    "media",
    "pages",
    "persons",
    "posts",
    "pricing",
    "products",
    "reviews",
  ]),
  items: z.array(itemOrPath).optional(),
})

const blockOrPath = z.union([pathSchema, block])
const page = pageSchema.extend({
  type: z.enum(["content", "page", "collection", "post", "person", "location"]),
  banner: blockOrPath.optional(),
  header: blockOrPath.optional(),
  sections: blockOrPath.array().optional(),
  footer: blockOrPath.optional(),
})

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/pages`,
    }),
    schema: page,
  }),
  blocks: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/blocks`,
    }),
    schema: block,
  }),
  data: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/blocks`,
    }),
    schema: block,
  }),
}

export type Page = z.infer<typeof page>
export type Block = z.infer<typeof block>
