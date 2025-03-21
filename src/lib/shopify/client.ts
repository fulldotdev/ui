import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import config from "fulldev.json"

export const client = createStorefrontApiClient({
  apiVersion: "2025-01",
  storeDomain: config.shopify.storeDomain,
  publicAccessToken: config.shopify.publicAccessToken,
})
