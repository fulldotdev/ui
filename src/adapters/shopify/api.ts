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
  shopifyLayoutSchema,
  shopifyPageSchema,
  shopifySearchSchema,
} from "./schemas"
import { shopifyLayoutTransform, shopifyPageTransform } from "./transforms"

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

export async function getPage(slug?: string) {
  let type: keyof typeof queryMap = "page"
  if (slug?.startsWith("producten/")) type = "product"
  if (slug?.startsWith("collecties/")) type = "collection"

  let handle = slug
  if (type === "product") handle = slug?.replace("producten/", "")
  if (type === "collection") handle = slug?.replace("collecties/", "")

  const queryMap = {
    page: PAGE_QUERY,
    product: PRODUCT_QUERY,
    collection: COLLECTION_QUERY,
  } as const

  const query = queryMap[type]
  const response = await requestShopify(query, {
    handle: handle || "home",
  })

  const data = response[type]
  return shopifyPageSchema.transform(shopifyPageTransform).parse(data)
}

export async function getLayout() {
  const { metaobject } = await requestShopify(LAYOUT_QUERY)
  return shopifyLayoutSchema.transform(shopifyLayoutTransform).parse(metaobject)
}

export const getSearch = async () => {
  const { search } = await requestShopify(SEARCH_QUERY)
  const parsedSearch = shopifySearchSchema.parse(search)
  return parsedSearch
}
