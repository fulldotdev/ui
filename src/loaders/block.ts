import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { blockSchema } from "@/schemas/block"

export function blockLoader(): Loader {
  return {
    name: "block-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/blocks",
      }).load(context)
    },
    schema: blockSchema,
  }
}
