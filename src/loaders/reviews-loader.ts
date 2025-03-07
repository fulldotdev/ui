import { reviewSchema } from "@/schemas/content/review"
import type { Loader, LoaderContext } from "astro/loaders"
import { file } from "astro/loaders"

export function reviewsLoader(): Loader {
  return {
    name: "reviews-loader",
    load: async (context: LoaderContext): Promise<void> => {
      const { logger, store } = context
      logger.info("Loading reviews collections")
      store.clear()

      await file("src/content/reviews.json", {
        parser: (text) =>
          JSON.parse(text).map((item: any, index: number) => ({
            ...item,
            id: `review-${index}`,
          })),
      }).load(context)
    },
    schema: reviewSchema,
  }
}
