import { collectionSchema } from '@/schemas/layouts/collection'
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

export function shopifyProductsLoader(options: { storeDomain: string; publicAccessToken: string }): Loader {
  return {
    name: 'shopify-collections',
    load: async ({ store }: LoaderContext): Promise<void> => {
      const response = await client.request(CollectionsQuery)
      const collections = response.data.collections.nodes as Partial<Collection>[]

      for (const collection of collections) {
        if (!collection.handle) return

        store.set({
          id: collection.handle,
          data: {
            type: 'Collection',
            id: collection.id,
            title: collection.title,
            image: {
              src: collection.image?.url,
              alt: collection.image?.altText,
            },
            meta: {
              title: collection.seo?.title,
              description: collection.seo?.description,
            },
          },
          rendered: {
            html: collection.descriptionHtml || '',
          },
        })
      }
    },
    schema: collectionSchema.extend({
      id: z.string(),
    }),
  }
}
