import { productSchema } from "@/schemas/blocks/product"
import { pageSchema } from "@/schemas/content/page"
import type {
  Article,
  Collection,
  Metaobject,
  Page,
  PageInfo,
  Product,
} from "@shopify/hydrogen-react/storefront-api-types"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import config from "fulldev.json"

import {
  COLLECTION_QUERY,
  LAYOUT_QUERY,
  PAGE_QUERY,
  PRODUCT_QUERY,
  SEARCH_QUERY,
} from "./graphql"
import {
  shopifyCollectionSchema,
  shopifyLayoutSchema,
  shopifyPageSchema,
  shopifyProductSchema,
  shopifySearchSchema,
} from "./schemas"
import { shopifyProductTransform } from "./transforms"

export const requestShopify = async (
  query: string,
  variables?: Record<string, any>
) => {
  const client = createStorefrontApiClient({
    apiVersion: "2025-01",
    storeDomain: config.shopify.storeDomain,
    publicAccessToken: config.shopify.publicAccessToken,
  })

  const { data, errors } = await client.request(query, { variables })

  if (errors && errors.graphQLErrors) {
    throw new Error(
      `Error requesting Shopify: ${errors.graphQLErrors[0].message}. Variables: ${JSON.stringify(
        variables
      )}. Query: ${query}`
    )
  } else if (errors) {
    throw new Error(
      `Error requesting Shopify: ${errors.message}. Query: ${query}. Variables: ${JSON.stringify(
        variables
      )}`
    )
  }

  return data
}

export const getProduct = async (handle: string) => {
  const { product } = await requestShopify(PRODUCT_QUERY, {
    handle,
  })
  return shopifyProductSchema
    .transform(shopifyProductTransform)
    .pipe(pageSchema)
    .parse(product)
}

export const getCollection = async (handle: string) => {
  const { collection } = await requestShopify(COLLECTION_QUERY, {
    handle,
  })
  const parsedCollection = shopifyCollectionSchema.parse(collection)
  return parsedCollection
}

export const getPage = async (handle: string) => {
  const { page } = await requestShopify(PAGE_QUERY, {
    handle,
  })
  const parsedPage = shopifyPageSchema.parse(page)
  return parsedPage
}

export const getLayout = async () => {
  const { metaobject } = await requestShopify(LAYOUT_QUERY)
  const parsedLayout = shopifyLayoutSchema.parse(metaobject)
  return parsedLayout
}

export const getSearch = async () => {
  const { search } = await requestShopify(SEARCH_QUERY)
  const parsedSearch = shopifySearchSchema.parse(search)
  return parsedSearch
}
