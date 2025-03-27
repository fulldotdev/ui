import {
  ShopifyCollectionsQuery,
  ShopifyLayoutQuery,
  ShopifyPagesQuery,
  ShopifyProductsQuery,
} from "@/loaders/shopify/queries"
import {
  transformShopifyLayout,
  transformShopifyPage,
} from "@/loaders/shopify/transforms"
import { createStorefrontClient } from "@shopify/hydrogen-react"
import type {
  Collection,
  Page,
  Product,
  QueryRoot,
} from "@shopify/hydrogen-react/storefront-api-types"
import config from "fulldev.json"

// --------------------------------------------------------------------------
// Shopify API Client
// --------------------------------------------------------------------------

export async function queryShopify(
  query: string,
  variables?: Record<string, any>
) {
  if (!("shopify" in config.pages)) {
    throw new Error("Shopify requested, but no config found")
  }

  const client = createStorefrontClient({
    storefrontApiVersion: "2025-01",
    storeDomain: config.pages.shopify.storeDomain,
    publicStorefrontToken: config.pages.shopify.publicAccessToken,
  })

  const response = await fetch(client.getStorefrontApiUrl(), {
    method: "POST",
    headers: client.getPublicTokenHeaders(),
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()
  const data = json.data as QueryRoot

  return data
}

// --------------------------------------------------------------------------
// Shopify Pages
// --------------------------------------------------------------------------

export async function getShopifyPages() {
  let nodes: Page[] = []
  let hasNextPage = true
  let endCursor = undefined

  while (hasNextPage) {
    const { pages } = await queryShopify(ShopifyPagesQuery, {
      endCursor: endCursor,
    })

    nodes.push(...pages.nodes)
    endCursor = pages.pageInfo.endCursor
    hasNextPage = pages.pageInfo.hasNextPage
  }

  return nodes
}

// --------------------------------------------------------------------------
// Shopify Products
// --------------------------------------------------------------------------

export async function getShopifyProducts() {
  let nodes: Product[] = []
  let hasNextPage = true
  let endCursor = undefined

  while (hasNextPage) {
    const { products } = await queryShopify(ShopifyProductsQuery, {
      endCursor: endCursor,
    })

    nodes.push(...products.nodes)
    endCursor = products.pageInfo.endCursor
    hasNextPage = products.pageInfo.hasNextPage
  }

  return nodes
}

// --------------------------------------------------------------------------
// Shopify Collections
// --------------------------------------------------------------------------

export async function getShopifyCollections() {
  let nodes: Collection[] = []
  let hasNextPage = true
  let endCursor = undefined

  while (hasNextPage) {
    const { collections } = await queryShopify(ShopifyCollectionsQuery, {
      endCursor: endCursor,
    })

    nodes.push(...collections.nodes)
    endCursor = collections.pageInfo.endCursor
    hasNextPage = collections.pageInfo.hasNextPage
  }

  return nodes
}

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

async function getShopifyLayout() {
  const { metaobject } = await queryShopify(ShopifyLayoutQuery)
  if (!metaobject) return
  return metaobject
}

// --------------------------------------------------------------------------
// Pages
// --------------------------------------------------------------------------

export async function getPages() {
  const [shopifyPages, shopifyProducts, shopifyCollections, shopifyLayout] =
    await Promise.all([
      getShopifyPages(),
      getShopifyProducts(),
      getShopifyCollections(),
      getShopifyLayout(),
    ])

  const layout = shopifyLayout && transformShopifyLayout(shopifyLayout)
  const pages = [...shopifyPages, ...shopifyProducts, ...shopifyCollections]

  return pages.map((page) => {
    const transformedPage = transformShopifyPage(page)
    return {
      ...layout,
      ...transformedPage,
    }
  })
}
