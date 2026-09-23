import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"

import { globalSchema } from "@/schemas/global"
import { pageSchema } from "@/schemas/page"
import { pageLoader } from "@/lib/page-loader"

export const collections = {
  pages: defineCollection({
    loader: pageLoader(),
    schema: pageSchema,
  }),
  globals: defineCollection({
    loader: glob({
      pattern: "**/[^_]*.{yaml,yml,json}",
      base: "src/content/globals",
    }),
    schema: globalSchema,
  }),
}
