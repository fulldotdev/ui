import { pageSchema } from "@/schemas/content/page"
import type { Loader, LoaderContext } from "astro/loaders"
import { glob } from "astro/loaders"

export function pagesLoader(): Loader {
  return {
    name: "pages-loader",
    load: async (context: LoaderContext): Promise<void> => {
      const { logger, store } = context
      logger.info("Loading pages collections")
      store.clear()

      await glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "./src/content/pages",
      }).load(context)
    },
    schema: pageSchema,
  }
}
