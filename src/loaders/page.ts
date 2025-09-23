import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { pageSchema } from "@/schemas/page"

export function pageLoader(): Loader {
  return {
    name: "page-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/pages",
      }).load(context)
    },
    schema: pageSchema,
  }
}
