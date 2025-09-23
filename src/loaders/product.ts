import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { productSchema } from "@/schemas/blocks/product"
import { pageSchema } from "@/schemas/page"

export function productLoader(): Loader {
  return {
    name: "product-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/products",
      }).load(context)
    },
    schema: productSchema.merge(pageSchema),
  }
}
