import { getPages } from "@/loaders/shopify/api"
import { pageSchema } from "@/schemas/page"
import type { Loader, LoaderContext } from "astro/loaders"

export function shopifyLoader(): Loader {
  return {
    name: "shopify",
    load: async ({
      logger,
      parseData,
      generateDigest,
      store,
    }: LoaderContext): Promise<void> => {
      logger.info("Loading shopify")
      const pages = await getPages()
      store.clear()

      for (const page of pages) {
        const data = await parseData({
          id: page.id,
          data: page,
        })

        const digest = generateDigest(data)

        store.set({
          id: page.id,
          body: page.content,
          rendered: {
            html: page.content,
          },
          data,
          digest,
        })
      }
    },
    schema: pageSchema,
  }
}
