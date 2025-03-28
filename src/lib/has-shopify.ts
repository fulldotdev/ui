import config from "../data/config.json"

export function hasShopify() {
  const anyConfig = config as any
  return "shopify" in anyConfig &&
    "storeDomain" in anyConfig.shopify &&
    "publicAccessToken" in anyConfig.shopify
    ? true
    : false
}
