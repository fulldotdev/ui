import { blockSchema } from "@/schemas/block"
import { itemSchema } from "@/schemas/item"
import { pageSchema } from "@/schemas/page"
import { defineCollection } from "astro:content"
import { glob, type Loader, type LoaderContext } from "astro/loaders"

export function myLoader(options: { url: string; apiKey: string }): Loader {
  // Configure the loader
  const feedUrl = new URL(options.url)
  // Return a loader object
  return {
    name: "my-loader",
    // Called when updating the collection.
    load: async (context: LoaderContext): Promise<void> => {
      // Load data and update the store
    },
    // Optionally, define the schema of an entry.
    // It will be overridden by user-defined schema.
    schema: async () =>
      z.object({
        // ...
      }),
  }
}

export const collections = {
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/pages`,
    }),
    schema: pageSchema,
  }),
  items: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yml,yaml,json}",
      base: `./src/content/items`,
    }),
    schema: itemSchema,
  }),
  blocks: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: `./src/content/blocks`,
    }),
    schema: blockSchema,
  }),
  shopify: defineCollection({
    loader: async () => {
      return [
        {
          id: "1",
          body: "hoi",
          rendered: "hoi",
        },
      ]
    },
  }),
  // items: defineCollection({
  //   loader: glob({
  //     pattern: "**/[^_]*.{yml,yaml,json}",
  //     base: `./src/content/items`,
  //   }),
  //   schema: itemSchema,
  // }),
  // layouts: defineCollection({
  //   loader: glob({
  //     pattern: "**/[^_]*.{json,yml,yaml}",
  //     base: `./src/content/layouts`,
  //   }),
  //   schema: layoutSchema,
  // }),
}
