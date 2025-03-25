import {
  COLLECTIONS_QUERY,
  LAYOUT_QUERY,
  PAGES_QUERY,
  PRODUCTS_QUERY,
} from "@/adapters/shopify/graphql"
import {
  shopifyLayoutSchema,
  shopifyPageSchema,
} from "@/adapters/shopify/schemas"
import {
  shopifyLayoutTransform,
  shopifyPageTransform,
} from "@/adapters/shopify/transforms"
import { layoutSchema } from "@/schemas/layout"
import { pageSchema } from "@/schemas/page"
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
// Pages
// --------------------------------------------------------------------------

async function getNodesRecursively(type: "pages" | "products" | "collections") {
  let nodes: any[] = []
  let hasNextPage: boolean = true
  let endCursor: string | undefined

  const queryMap = {
    pages: PAGES_QUERY,
    products: PRODUCTS_QUERY,
    collections: COLLECTIONS_QUERY,
  } as const

  while (hasNextPage) {
    const response = await requestShopify(queryMap[type], { endCursor })
    const data = response[type]
    nodes.push(...data.nodes)
    hasNextPage = data.pageInfo.hasNextPage
    endCursor = data.pageInfo.endCursor
  }

  return nodes
}

export async function getPages() {
  const pageNodes = await getNodesRecursively("pages")
  const productNodes = await getNodesRecursively("products")
  const collectionNodes = await getNodesRecursively("collections")

  const pages = [...pageNodes, ...productNodes, ...collectionNodes]
  const parsedPages = pages.map((page) =>
    shopifyPageSchema
      .transform(shopifyPageTransform)
      .pipe(pageSchema)
      .parse(page)
  )

  return parsedPages
}

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

export async function getLayout() {
  const { metaobject } = await requestShopify(LAYOUT_QUERY)
  return shopifyLayoutSchema
    .transform(shopifyLayoutTransform)
    .pipe(layoutSchema)
    .parse(metaobject)
}
