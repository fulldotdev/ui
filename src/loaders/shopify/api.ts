import { error } from "console"
import {
  ShopifyCollectionsQuery,
  ShopifyLayoutQuery,
  ShopifyPagesQuery,
  ShopifyProductsQuery,
} from "@/loaders/shopify/queries"
import {
  shopifyCollectionsResponseSchema,
  shopifyLayoutResponseSchema,
  shopifyPagesResponseSchema,
  shopifyProductsResponseSchema,
  type ShopifyPageSchema,
} from "@/loaders/shopify/schemas"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import config from "fulldev.json"

import { transformShopifyPage } from "./transforms"

// --------------------------------------------------------------------------
// Shopify API Client
// --------------------------------------------------------------------------

export async function requestShopify(
  query: string,
  variables?: Record<string, any>
) {
  if (!("shopify" in config.pages)) {
    throw new Error("Shopify requested, but no config found")
  }

  const client = createStorefrontApiClient({
    apiVersion: "2025-01",
    storeDomain: config.pages.shopify.storeDomain,
    publicAccessToken: config.pages.shopify.publicAccessToken,
  })

  const { data, errors } = await client.request(query, { variables })

  if (errors) {
    const errorMessage = errors.graphQLErrors?.[0]?.message || errors.message
    throw new Error("Error requesting Shopify API: " + errorMessage)
  }

  return data
}

// --------------------------------------------------------------------------
// Shopify Pages
// --------------------------------------------------------------------------

export async function getShopifyPages() {
  let nodes: ShopifyPageSchema[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(ShopifyPagesQuery, { endCursor })

    const { data, error } = shopifyPagesResponseSchema.safeParse(response)
    if (error) {
      throw new Error("Error parsing Shopify pages: " + error.message)
    }

    nodes.push(...data.pages.nodes)
    hasNextPage = data.pages.pageInfo.hasNextPage
    endCursor = data.pages.pageInfo.endCursor
  }

  return nodes
}

// --------------------------------------------------------------------------
// Shopify Products
// --------------------------------------------------------------------------

export async function getShopifyProducts() {
  let nodes: ShopifyPageSchema[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(ShopifyProductsQuery, { endCursor })

    const { data, error } = shopifyProductsResponseSchema.safeParse(response)
    if (error) {
      throw new Error("Error parsing Shopify products: " + error.message)
    }

    nodes.push(...data.products.nodes)
    hasNextPage = data.products.pageInfo.hasNextPage
    endCursor = data.products.pageInfo.endCursor
  }

  return nodes
}

// --------------------------------------------------------------------------
// Shopify Collections
// --------------------------------------------------------------------------

export async function getShopifyCollections() {
  let nodes: ShopifyPageSchema[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(ShopifyCollectionsQuery, {
      endCursor,
    })

    const { data, error } = shopifyCollectionsResponseSchema.safeParse(response)
    if (error) {
      throw new Error("Error parsing Shopify collections: " + error.message)
    }

    nodes.push(...data.collections.nodes)
    hasNextPage = data.collections.pageInfo.hasNextPage
    endCursor = data.collections.pageInfo.endCursor
  }

  return nodes
}

// --------------------------------------------------------------------------
// Pages
// --------------------------------------------------------------------------

export async function getPages() {
  const [shopifyPages, shopifyProducts, shopifyCollections] = await Promise.all(
    [getShopifyPages(), getShopifyProducts(), getShopifyCollections()]
  )

  const all = [...shopifyPages, ...shopifyProducts, ...shopifyCollections]
  const transformedNodes = all.map(transformShopifyPage)

  return transformedNodes
}

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

// async function getShopifyLayout() {
//   const response = await requestShopify(ShopifyLayoutQuery)
//   const parsedResponse = shopifyLayoutResponseSchema.parse(response)
//   const transformedLayout = transformShopifyLayout(parsedResponse.metaobject)
//   return transformedLayout
// }
