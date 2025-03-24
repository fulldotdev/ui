import {
  COLLECTION_QUERY,
  LAYOUT_QUERY,
  PAGE_QUERY,
  PRODUCT_QUERY,
  SEARCH_QUERY,
} from "@/adapters/shopify/graphql"
import {
  shopifyLayoutSchema,
  shopifyPageSchema,
  shopifySearchSchema,
} from "@/adapters/shopify/schemas"
import {
  shopifyLayoutTransform,
  shopifyPageTransform,
  shopifySearchTransform,
} from "@/adapters/shopify/transforms"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import config from "fulldev.json"

// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

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

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

export async function getLayout() {
  const { metaobject } = await requestShopify(LAYOUT_QUERY)
  return shopifyLayoutSchema.transform(shopifyLayoutTransform).parse(metaobject)
}

// --------------------------------------------------------------------------
// Search
// --------------------------------------------------------------------------

async function getSearchRequest(endCursor?: string) {
  const { search } = await requestShopify(SEARCH_QUERY, { endCursor })
  return search
}

export const getSearch = async () => {
  const search = await getSearchRequest()
  let allNodes = [...search.nodes]

  while (search.pageInfo.hasNextPage) {
    const nextSearch = await getSearchRequest(search.pageInfo.endCursor)
    allNodes = [...allNodes, ...nextSearch.nodes]
  }

  return shopifySearchSchema.transform(shopifySearchTransform).parse(allNodes)
}
