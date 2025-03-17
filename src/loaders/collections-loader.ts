import { collectionSchema } from "@/schemas/blocks/collection"
import type { Collection } from "@shopify/hydrogen/storefront-api-types"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import { glob } from "astro/loaders"
import type { Loader, LoaderContext } from "astro/loaders"

import config from "../data/config"

const CollectionsQuery = `#graphql
  query {
    collections(first: 250) {
      nodes {
        id
        handle
        title
        descriptionHtml
        image {
          url
          altText
        }
        seo {
          title
          description
        }
      }
    }
  }
`
const isShopify =
  "shopify" in config &&
  typeof config.shopify === "object" &&
  config.shopify !== null &&
  "storeDomain" in config.shopify &&
  "publicAccessToken" in config.shopify

export function collectionsLoader(): Loader {
  return {
    name: "collections-loader",
    load: async (context: LoaderContext): Promise<void> => {
      if (!config.content.collections) return
      const { logger, store, parseData, generateDigest } = context
      logger.info("Loading collections")
      store.clear()

      // Loading local markdown files
      await glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "./src/content/collections",
      }).load(context)

      // Loading from Shopify
      if (isShopify) {
        const client = createStorefrontApiClient({
          storeDomain: config.shopify.storeDomain,
          apiVersion: "2025-01",
          publicAccessToken: config.shopify.publicAccessToken,
        })
        const response = await client.request(CollectionsQuery)
        const collections = response.data.collections
          .nodes as Partial<Collection>[]

        for (const collection of collections) {
          if (!collection.handle) return
          if (!collection.id) return

          const data = await parseData({
            id: collection.handle,
            data: {
              type: "collection",
              id: collection.id,
              title: collection.title,
              image: {
                src: collection.image?.url,
                alt: collection.image?.altText ?? undefined,
              },
              seo: {
                title: collection.seo?.title ?? undefined,
                description: collection.seo?.description ?? undefined,
              },
            },
          })

          const digest = generateDigest(data)

          store.set({
            id: collection.handle,
            data: data,
            rendered: {
              html: collection.descriptionHtml || "",
            },
            digest,
          })
        }
      }
    },
    schema: collectionSchema,
  }
}
