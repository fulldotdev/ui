import {
  ShopifyCollectionsQuery,
  ShopifyPagesQuery,
  ShopifyProductsQuery,
} from "@/loaders/shopify/queries"
import {
  shopifyCollectionsSchema,
  shopifyPagesSchema,
  shopifyProductsSchema,
} from "@/loaders/shopify/schemas"
import type { Page } from "@shopify/hydrogen-react/storefront-api-types"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import config from "fulldev.json"

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
// Shopify Products, Collections, and Pages - Recursively
// --------------------------------------------------------------------------

export async function getShopifyPages() {
  let nodes: any[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(ShopifyPagesQuery, { endCursor })
    const parsedResponse = shopifyPagesSchema.parse(response)
    const data = parsedResponse.pages

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
  }

  return nodes as Page[]
}

export async function getShopifyProducts() {
  let nodes: any[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(ShopifyProductsQuery, { endCursor })
    const parsedResponse = shopifyProductsSchema.parse(response)
    const data = parsedResponse.products

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
  }

  return nodes
}

export async function getShopifyCollections() {
  let nodes: any[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  while (hasNextPage) {
    const response = await requestShopify(ShopifyCollectionsQuery, {
      endCursor,
    })
    const parsedResponse = shopifyCollectionsSchema.parse(response)
    const data = parsedResponse.collections

    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
  }

  return nodes
}

// // --------------------------------------------------------------------------
// // Shopify Layout
// // --------------------------------------------------------------------------

// async function getShopifyLayout() {
//   const response = await requestShopify(LAYOUT_QUERY)
//   const parsedResponse = shopifyLayoutResponseSchema.parse(response)
//   return parsedResponse.metaobject
// }

// // --------------------------------------------------------------------------
// // Fulldev Pages with Layout - Recursively
// // --------------------------------------------------------------------------

// export async function getPages() {
//   // Fetch all data in parallel
//   const [pageNodes, productNodes, collectionNodes, layoutData] =
//     await Promise.all([
//       getAllShopifyPages(),
//       getAllShopifyProducts(),
//       getAllShopifyCollections(),
//       getShopifyLayout(),
//     ])

//   // Combine all nodes
//   const allNodes = [...pageNodes, ...productNodes, ...collectionNodes]
//   const transformedNodes = allNodes.map(shopifyPageTransform)

//   const transformedLayout = shopifyLayoutTransform(layoutData)

//   // Merge layout data with each page
//   const transformedPagesWithLayout = transformedNodes.map(
//     (transformedNode) => ({
//       ...transformedLayout,
//       ...transformedNode,
//     })
//   )

//   return transformedPagesWithLayout
// }
