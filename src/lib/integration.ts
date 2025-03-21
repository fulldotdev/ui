import type { AstroIntegration } from "astro"

import { syncShopifyCollections } from "./sync-shopify-collections"
import { syncShopifyProducts } from "./sync-shopify-products"

interface Config {
  models: {
    pages: boolean
    posts: boolean
    persons: boolean
    locations: boolean
    products: boolean
    collections: boolean
  }
  shopify?: {
    storeDomain: string
    publicAccessToken: string
    productsFolder: string
    collectionsFolder: string
  }
}

export default function fulldevIntegration(config: Config): AstroIntegration {
  return {
    name: "/integration",
    hooks: {
      "astro:config:setup": async ({ injectScript }) => {
        // injectScript("page-ssr", `import "@/styles/globals.css";`)
        // injectScript("page-ssr", `import "@/styles/theme.css";`)
        if ("shopify" in config && config.shopify) {
          // await syncShopifyProducts(config.shopify)
          // await syncShopifyCollections(config.shopify)
        }
      },
    },
  }
}
