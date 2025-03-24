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
} from "./queries"
import {
  transformCollection,
  transformLayout,
  transformPage,
  transformProduct,
  transformSearch,
} from "./transforms"

export const requestShopify = async (
  query: string,
  variables?: Record<string, any>
) => {
  if (!config.shopify) {
    throw new Error("Shopify config not found")
  }

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

export const getPage = async (handle: string) => {
  const { page } = (await requestShopify(PAGE_QUERY, {
    handle,
  })) as {
    page: Partial<Page>
  }
  return transformPage(page)
}

export const getProduct = async (handle: string) => {
  const { product } = (await requestShopify(PRODUCT_QUERY, {
    handle,
  })) as {
    product: Partial<Product>
  }
  return transformProduct(product)
}

export const getCollection = async (handle: string) => {
  const { collection } = (await requestShopify(COLLECTION_QUERY, {
    handle,
  })) as {
    collection: Partial<Collection>
  }
  return transformCollection(collection)
}

export const getSearch = async (endCursor: string | undefined = undefined) => {
  const { search } = (await requestShopify(SEARCH_QUERY, { endCursor })) as {
    search: {
      pageInfo: Partial<PageInfo>
      nodes: Partial<Page | Article | Product>[]
    }
  }

  return {
    pageInfo: search.pageInfo,
    nodes: search.nodes.map(transformSearch),
  }
}

export const getSearchRecursive = async (
  endCursor: string | undefined = undefined
) => {
  const search = await getSearch(endCursor)
  let allNodes = [...search.nodes]

  if (search.pageInfo.hasNextPage && search.pageInfo.endCursor) {
    const nextNodes = await getSearchRecursive(search.pageInfo.endCursor)
    allNodes = [...allNodes, ...nextNodes]
  }

  return allNodes
}

export const getLayout = async () => {
  const { metaobject } = (await requestShopify(LAYOUT_QUERY)) as {
    metaobject: Partial<Metaobject>
  }
  return transformLayout(metaobject)
}
