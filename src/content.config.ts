import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { entrySchema, formSchema, itemSchema } from "@/lib/schemas"

export const collections = {
  articles: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/articles",
    }),
    schema: entrySchema,
  }),
  events: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/events",
    }),
    schema: entrySchema,
  }),
  forms: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yml,yaml}",
      base: "src/content/forms",
    }),
    schema: formSchema,
  }),
  jobs: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/jobs",
    }),
    schema: entrySchema,
  }),
  locations: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/locations",
    }),
    schema: entrySchema,
  }),
  pages: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/pages",
    }),
    schema: entrySchema,
  }),
  persons: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/persons",
    }),
    schema: entrySchema,
  }),
  policies: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/policies",
    }),
    schema: entrySchema,
  }),
  reviews: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yml,yaml}",
      base: "src/content/reviews",
    }),
    schema: itemSchema,
  }),
  services: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/services",
    }),
    schema: entrySchema,
  }),
  docs: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{md,mdx}",
      base: "src/content/docs",
    }),
    schema: entrySchema,
  }),
}
