import { personSchema } from "@/schemas/content/person"
import type { Loader, LoaderContext } from "astro/loaders"
import { glob } from "astro/loaders"

export function personsLoader(): Loader {
  return {
    name: "persons-loader",
    load: async (context: LoaderContext): Promise<void> => {
      const { logger, store } = context
      logger.info("Loading persons collections")
      store.clear()

      await glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "./src/content/persons",
      }).load(context)
    },
    schema: personSchema,
  }
}
