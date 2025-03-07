import { projectSchema } from "@/schemas/content/project"
import type { Loader, LoaderContext } from "astro/loaders"
import { glob } from "astro/loaders"

export function projectsLoader(): Loader {
  return {
    name: "projects-loader",
    load: async (context: LoaderContext): Promise<void> => {
      const { logger, store } = context
      logger.info("Loading projects collections")
      store.clear()

      await glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "./src/content/projects",
      }).load(context)
    },
    schema: projectSchema,
  }
}
