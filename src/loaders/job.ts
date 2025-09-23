import { glob } from "astro/loaders"
import type { Loader } from "astro/loaders"

import { jobSchema } from "@/schemas/blocks/job"
import { pageSchema } from "@/schemas/page"

export function jobLoader(): Loader {
  return {
    name: "job-loader",
    load: async (context) => {
      return glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "src/content/jobs",
      }).load(context)
    },
    schema: jobSchema.merge(pageSchema),
  }
}
