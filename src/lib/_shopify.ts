import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import config from "fulldev.json"

export const requestShopify = async (
  query: string,
  variables: Record<string, any> = {}
) => {
  if (!("shopify" in config)) {
    throw new Error("Shopify config not found in fulldev.json")
  }
  const shopifyConfig = config.shopify as {
    storeDomain: string
    publicAccessToken: string
  }
  const client = createStorefrontApiClient({
    apiVersion: "2025-01",
    storeDomain: shopifyConfig.storeDomain,
    publicAccessToken: shopifyConfig.publicAccessToken,
  })
  const response = await client.request(query, {
    variables,
  })

  if (response.errors) {
    if (response.errors.graphQLErrors) {
      console.error(response.errors.graphQLErrors)
      throw new Error(
        `Failed to fetch data from Shopify. ${response.errors.graphQLErrors[0].message}`
      )
    } else {
      console.error(response.errors)
      throw new Error("Failed to fetch data from Shopify. Read error above.")
    }
  }
  return response.data
}
