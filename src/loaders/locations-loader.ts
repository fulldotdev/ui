import { locationSchema } from "@/schemas/content/location"
import type { Loader, LoaderContext } from "astro/loaders"
import { glob } from "astro/loaders"

export function locationsLoader(): Loader {
  return {
    name: "locations-loader",
    load: async (context: LoaderContext): Promise<void> => {
      const { logger, store } = context
      logger.info("Loading locations collections")
      store.clear()

      await glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "./src/content/locations",
      }).load(context)
    },
    schema: locationSchema,
  }
}
