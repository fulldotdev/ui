import { blockSchema } from "@/schemas/block"
import { itemSchema } from "@/schemas/item"
import { pageSchema } from "@/schemas/page"
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "zod"

// Helper schema for content file references with auto-loaded frontmatter
export const referenceSchema = z.string().transform(async (path) => {
  const allEntries = import.meta.glob("src/content/**/**/*.{md,mdx}")

  const foundKey = Object.keys(allEntries).find((key) => key.endsWith(path))

  if (!foundKey) {
    throw new Error(`Referenced file not found: ${path}`)
  }

  const foundValue = allEntries[foundKey]
  if (!foundValue) return path

  const loadedFile = await foundValue()
  if (!loadedFile) return path
  if (typeof loadedFile !== "object") return path
  if (!("frontmatter" in loadedFile)) return path
  return loadedFile.frontmatter
})

// Helper schema for auto-loading frontmatter from referenced content files
const block = blockSchema.extend({
  type: z.string(),
  items: z
    .array(z.union([referenceSchema.pipe(itemSchema), itemSchema]))
    .optional(),
})

// Helper schema for auto-loading frontmatter from referenced content files
const blockOrReference = z.union([referenceSchema.pipe(block), block])

// Helper schema for auto-loading frontmatter from referenced content files
const page = pageSchema.extend({
  type: z.string(),
  banner: blockOrReference.optional(),
  header: blockOrReference.optional(),
  sections: blockOrReference.array().optional(),
  footer: blockOrReference.optional(),
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
  items: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/items`,
    }),
    schema: itemSchema,
  }),
}

export type Page = z.infer<typeof page>
export type Block = z.infer<typeof block>
