import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { serviceSchema } from "@/schemas/blocks/service"
import { pageSchema } from "@/schemas/page"

export function serviceLoader(): Loader {
  return {
    name: "service-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/services",
      }).load(context)
    },
    schema: serviceSchema.merge(pageSchema),
  }
}
