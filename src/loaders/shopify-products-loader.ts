import { productSchema } from "@/schemas/content/product"
import type { Product } from "@shopify/hydrogen/storefront-api-types"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import { z } from "astro:schema"
import type { Loader, LoaderContext } from "astro/loaders"

import config from "../data/config.json"

export const client = createStorefrontApiClient({
  storeDomain: config.shopify.storeDomain,
  apiVersion: "2025-01",
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

export function shopifyProductsLoader(): Loader {
  return {
    name: "shopify-products-loader",
    load: async ({
      store,
      logger,
      parseData,
      generateDigest,
    }: LoaderContext): Promise<void> => {
      logger.info("Loading Shopify products")
      store.clear()

      const response = await client.request(ProductsQuery)
      const products = response.data.products.nodes as Partial<Product>[]

      for (const product of products) {
        if (!product.handle) return
        if (!product.id) return

        const data = await parseData({
          id: product.handle,
          data: {
            type: "product",
            id: product.id,
            title: product.title,
            price: {
              amount: Number(product.priceRange?.minVariantPrice?.amount),
              compare: Number(
                product.compareAtPriceRange?.minVariantPrice?.amount
              ),
              currency: product.priceRange?.minVariantPrice?.currencyCode,
            },
            images: product.images?.nodes.map((image) => ({
              src: image.url,
              alt: image.altText ?? undefined,
            })),
            collections: product.collections?.nodes.map(
              (collection) => collection.handle
            ),
            seo: {
              title: product.seo?.title ?? undefined,
              description: product.seo?.description ?? undefined,
            },
            variants: product.variants,
          },
        })

        const digest = generateDigest(data)

        store.set({
          id: product.handle,
          data: data,
          rendered: {
            html: product.descriptionHtml || "",
          },
          digest,
        })
      }
    },
    schema: productSchema.extend({
      id: z.string(),
      variants: z.any(),
    }),
  }
}
