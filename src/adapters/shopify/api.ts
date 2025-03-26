import {
  COLLECTIONS_QUERY,
  LAYOUT_QUERY,
  PAGES_QUERY,
  PRODUCTS_QUERY,
} from "@/adapters/shopify/graphql"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import config from "fulldev.json"

import {
  shopifyCollectionsResponseSchema,
  shopifyLayoutResponseSchema,
  shopifyPagesResponseSchema,
  shopifyProductsResponseSchema,
} from "./schemas"
import { shopifyLayoutTransform, shopifyPageTransform } from "./transforms"

// --------------------------------------------------------------------------
// Shopify API Client
// --------------------------------------------------------------------------

async function requestShopify(query: string, variables?: Record<string, any>) {
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
// Shopify Products, Collections, and Pages - Recursively
// --------------------------------------------------------------------------

async function getAllShopifyPages() {
  let nodes: any[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(PAGES_QUERY, { endCursor })
    const parsedResponse = shopifyPagesResponseSchema.parse(response)
    const data = parsedResponse.pages

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
  }

  return nodes
}

async function getAllShopifyProducts() {
  let nodes: any[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(PRODUCTS_QUERY, { endCursor })
    const parsedResponse = shopifyProductsResponseSchema.parse(response)
    const data = parsedResponse.products

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
  }

  return nodes
}

async function getAllShopifyCollections() {
  let nodes: any[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(COLLECTIONS_QUERY, { endCursor })
    const parsedResponse = shopifyCollectionsResponseSchema.parse(response)
    const data = parsedResponse.collections

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
  }

  return nodes
}

// --------------------------------------------------------------------------
// Shopify Layout
// --------------------------------------------------------------------------

async function getShopifyLayout() {
  const response = await requestShopify(LAYOUT_QUERY)
  const parsedResponse = shopifyLayoutResponseSchema.parse(response)
  return parsedResponse.metaobject
}

// --------------------------------------------------------------------------
// Fulldev Pages with Layout - Recursively
// --------------------------------------------------------------------------

export async function getPages() {
  // Fetch all data in parallel
  const [pageNodes, productNodes, collectionNodes, layoutData] =
    await Promise.all([
      getAllShopifyPages(),
      getAllShopifyProducts(),
      getAllShopifyCollections(),
      getShopifyLayout(),
    ])

  // Combine all nodes
  const allNodes = [...pageNodes, ...productNodes, ...collectionNodes]
  const transformedNodes = allNodes.map(shopifyPageTransform)

  const transformedLayout = shopifyLayoutTransform(layoutData)

  // Merge layout data with each page
  const transformedPagesWithLayout = transformedNodes.map(
    (transformedNode) => ({
      ...transformedLayout,
      ...transformedNode,
    })
  )

  return transformedPagesWithLayout
}
