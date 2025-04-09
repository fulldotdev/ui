import { createStorefrontClient } from "@shopify/hydrogen-react"
import type {
  Article,
  Blog,
  Collection,
  Product,
  QueryRoot,
  ShopPolicy,
  ShopPolicyWithDefault,
} from "@shopify/hydrogen-react/storefront-api-types"

import config from "../data/config.json"
import { hasShopify } from "../lib/has-shopify"
import {
  ShopifyArticlesQuery,
  ShopifyBlogsQuery,
  ShopifyCollectionsQuery,
  ShopifyProductsQuery,
  ShopifyShopQuery,
} from "./queries"
import {
  transformShopifyArticle,
  transformShopifyBlog,
  transformShopifyCollection,
  transformShopifyPolicy,
  transformShopifyProduct,
} from "./transformers"

// --------------------------------------------------------------------------
// Shopify API Client
// --------------------------------------------------------------------------

export async function query(query: string, variables?: Record<string, any>) {
  if (!hasShopify()) {
    throw new Error("Shopify requested, but no config found")
  }

  const client = createStorefrontClient({
    storefrontApiVersion: "2025-01",
    storeDomain: config.shopify.storeDomain,
    publicStorefrontToken: config.shopify.publicAccessToken,
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
// Products
// --------------------------------------------------------------------------

export async function getProducts() {
  let nodes: Product[] = []
  let hasNextPage = true
  let endCursor = undefined

  while (hasNextPage) {
    const { products } = await query(ShopifyProductsQuery, {
      endCursor: endCursor,
    })

    nodes.push(...products.nodes)
    endCursor = products.pageInfo.endCursor
    hasNextPage = products.pageInfo.hasNextPage
  }

  const transformedProducts = nodes.map(transformShopifyProduct)
  return transformedProducts
}

// --------------------------------------------------------------------------
// Collections
// --------------------------------------------------------------------------

export async function getCollections() {
  let nodes: Collection[] = []
  let hasNextPage = true
  let endCursor = undefined

  while (hasNextPage) {
    const { collections } = await query(ShopifyCollectionsQuery, {
      endCursor: endCursor,
    })

    nodes.push(...collections.nodes)
    endCursor = collections.pageInfo.endCursor
    hasNextPage = collections.pageInfo.hasNextPage
  }

  const transformedCollections = nodes.map(transformShopifyCollection)
  return transformedCollections
}

// --------------------------------------------------------------------------
// Articles
// --------------------------------------------------------------------------

export async function getArticles() {
  let nodes: Article[] = []
  let hasNextPage = true
  let endCursor = undefined

  while (hasNextPage) {
    const { articles } = await query(ShopifyArticlesQuery, {
      endCursor: endCursor,
    })

    nodes.push(...articles.nodes)
    endCursor = articles.pageInfo.endCursor
    hasNextPage = articles.pageInfo.hasNextPage
  }

  const transformedArticles = nodes.map(transformShopifyArticle)
  return transformedArticles
}

// --------------------------------------------------------------------------
// Blogs
// --------------------------------------------------------------------------

export async function getBlogs() {
  let nodes: Blog[] = []
  let hasNextPage = true
  let endCursor = undefined

  while (hasNextPage) {
    const { blogs } = await query(ShopifyBlogsQuery, {
      endCursor: endCursor,
    })

    nodes.push(...blogs.nodes)
    endCursor = blogs.pageInfo.endCursor
    hasNextPage = blogs.pageInfo.hasNextPage
  }

  const transformedBlogs = nodes.map(transformShopifyBlog)
  return transformedBlogs
}

// --------------------------------------------------------------------------
// Policies
// --------------------------------------------------------------------------

export async function getPolicies() {
  const { shop } = await query(ShopifyShopQuery)
  let policies: (ShopPolicy | ShopPolicyWithDefault)[] = []
  if (shop.privacyPolicy) policies.push(shop.privacyPolicy)
  if (shop.refundPolicy) policies.push(shop.refundPolicy)
  if (shop.shippingPolicy) policies.push(shop.shippingPolicy)
  if (shop.subscriptionPolicy) policies.push(shop.subscriptionPolicy)
  if (shop.termsOfService) policies.push(shop.termsOfService)

  const transformedPolicies = policies.map(transformShopifyPolicy)
  return transformedPolicies
}
