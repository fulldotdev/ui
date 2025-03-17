import { productSchema } from "@/schemas/blocks/product"
import type { Product } from "@shopify/hydrogen/storefront-api-types"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import { glob } from "astro/loaders"
import type { Loader, LoaderContext } from "astro/loaders"

import config from "../data/config"

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

const isShopify =
  "shopify" in config &&
  typeof config.shopify === "object" &&
  config.shopify !== null &&
  "storeDomain" in config.shopify &&
  "publicAccessToken" in config.shopify

export function productsLoader(): Loader {
  return {
    name: "products-loader",
    load: async (context: LoaderContext): Promise<void> => {
      if (!config.content.products) return

      const { logger, store, parseData, generateDigest } = context
      logger.info("Loading products")
      store.clear()

      // Loading local markdown files
      await glob({
        pattern: "**/[^_]*.{md,mdx}",
        base: "./src/content/products",
      }).load(context)

      // Loading from Shopify
      if (isShopify) {
        const client = createStorefrontApiClient({
          storeDomain: config.shopify.storeDomain,
          apiVersion: "2025-01",
          publicAccessToken: config.shopify.publicAccessToken,
        })
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
      }
    },
    schema: productSchema,
  }
}
