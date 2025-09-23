import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { layoutSchema } from "@/schemas/layout"

export function layoutLoader(): Loader {
  return {
    name: "layout-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{yaml,yml,json}",
        base: "src/content/layouts",
      }).load(context)
    },
    schema: layoutSchema,
  }
}
