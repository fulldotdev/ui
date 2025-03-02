import { collectionSchema } from '@/schemas/content/collection'
import type { Collection } from '@shopify/hydrogen/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import type { Loader, LoaderContext } from 'astro/loaders'
import { z } from 'astro:schema'
import config from '../data/config.json'

export const client = createStorefrontApiClient({
  storeDomain: config.shopify.storeDomain,
  apiVersion: '2025-01',
  publicAccessToken: config.shopify.publicAccessToken,
})

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

export function shopifyCollectionsLoader(): Loader {
  return {
    name: 'shopify-collections',
    load: async ({ store, logger, parseData, generateDigest }: LoaderContext): Promise<void> => {
      logger.info('Loading Shopify collections')
      store.clear()

      const response = await client.request(CollectionsQuery)
      const collections = response.data.collections.nodes as Partial<Collection>[]

      for (const collection of collections) {
        if (!collection.handle) return
        if (!collection.id) return

        const data = await parseData({
          id: collection.handle,
          data: {
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
            html: collection.descriptionHtml || '',
          },
          digest,
        })
      }
    },
    schema: collectionSchema.extend({
      id: z.string(),
    }),
  }
}
