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

  try {
    const { data } = await client.request(query, { variables })
    return data
  } catch (error: any) {
    const errorMessage = error.graphQLErrors?.[0]?.message || error.message
    throw new Error(
      `Shopify API Error: ${errorMessage}\nQuery: ${query}\nVariables: ${JSON.stringify(variables)}`
    )
  }
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
    const parsedResponse = shopifyPagesResponseSchema.parse(response)
    const data = parsedResponse.pages

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
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
    const parsedResponse = shopifyProductsResponseSchema.parse(response)
    const data = parsedResponse.products

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
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
    const parsedResponse = shopifyCollectionsResponseSchema.parse(response)
    const data = parsedResponse.collections

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
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
