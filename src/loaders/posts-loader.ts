import { postSchema } from "@/schemas/content/post"
import type { Loader, LoaderContext } from "astro/loaders"
import { glob } from "astro/loaders"

export function postsLoader(): Loader {
  return {
    name: "posts-loader",
    load: async (context: LoaderContext): Promise<void> => {
      const { logger, store } = context
      logger.info("Loading posts collections")
      store.clear()

      await glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "./src/content/posts",
      }).load(context)
    },
    schema: postSchema,
  }
}
