import { productSchema } from '@/schemas/content/product'
import type { Product } from '@shopify/hydrogen/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import type { Loader, LoaderContext } from 'astro/loaders'
import { z } from 'astro:schema'
import config from '../data/config.json'

export const client = createStorefrontApiClient({
  storeDomain: config.shopify.storeDomain,
  apiVersion: '2025-01',
  publicAccessToken: config.shopify.publicAccessToken,
})

const ProductsQuery = `#graphql
  query {
    products(first: 250) {
      nodes {
        id
        handle
        title
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 50) {
          nodes {
            url
            altText
          }
        }
        collections(first: 50) {
          nodes {
            handle
          }
        }
        seo {
          title
          description
        }
        options(first: 50) {
          name
          optionValues {
            id
            name
          }
        }
        variants(first: 250) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            quantityAvailable
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`

export function shopifyProductsLoader(options: { storeDomain: string; publicAccessToken: string }): Loader {
  return {
    name: 'shopify-products',
    load: async ({ store }: LoaderContext): Promise<void> => {
      const response = await client.request(ProductsQuery)
      const products = response.data.products.nodes as Partial<Product>[]

      for (const product of products) {
        if (!product.handle) return

        store.set({
          id: product.handle,
          data: {
            gid: product.id,
            title: product.title,
            price: {
              amount: Number(product.priceRange?.minVariantPrice?.amount ?? null),
              compare: Number(product.compareAtPriceRange?.minVariantPrice?.amount ?? null),
              currency: product.priceRange?.minVariantPrice?.currencyCode,
            },

            images: product.images?.nodes.map((image) => ({
              src: image.url,
              alt: image.altText,
            })),
            collections: product.collections?.nodes.map((collection) => collection.handle) as any,
            meta: {
              title: product.seo?.title,
              description: product.seo?.description,
            },
            options: product.options?.map(({ name, optionValues }) => ({
              name,
              values: optionValues?.map(({ name }) => name),
            })),
            variants: product.variants?.nodes.map(
              ({ id, title, price, compareAtPrice, quantityAvailable, availableForSale, selectedOptions }) => ({
                id,
                title,
                price: {
                  amount: Number(price?.amount ?? null),
                  compare: Number(compareAtPrice?.amount ?? null),
                  currency: price?.currencyCode,
                },
                quantityAvailable,
                availableForSale,
                selectedOptions,
              })
            ),
          },
          rendered: {
            html: product.descriptionHtml || '',
          },
        })
      }
    },
    schema: productSchema.extend({
      gid: z.string(),
    }),
  }
}
