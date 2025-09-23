import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { personSchema } from "@/schemas/blocks/person"
import { pageSchema } from "@/schemas/page"

export function personLoader(): Loader {
  return {
    name: "person-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/persons",
      }).load(context)
    },
    schema: personSchema.merge(pageSchema),
  }
}
