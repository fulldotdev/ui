import type {
  ShopifyBlockSchema,
  ShopifyImageSchema,
  ShopifyItemSchema,
  ShopifyLayoutSchema,
  ShopifyPageSchema,
  ShopifyProductPriceRangeSchema,
} from "@/loaders/shopify/schemas"
import type { BlockSchema } from "@/schemas/block"
import type { ImageSchema } from "@/schemas/fields/image"
import type { PriceSchema } from "@/schemas/fields/price"
import type { ItemSchema } from "@/schemas/item"
import type { PageSchema } from "@/schemas/page"

// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

function transformShopifyImage(image: ShopifyImageSchema) {
  return {
    src: image.url,
    alt: image.altText ?? undefined,
  } satisfies ImageSchema
}

function transformShopifyPrice(
  priceRange: ShopifyProductPriceRangeSchema,
  compareAtPriceRange: ShopifyProductPriceRangeSchema
): PriceSchema {
  return {
    amount: Number(priceRange.minVariantPrice.amount),
    currency: priceRange.minVariantPrice.currencyCode,
    compare: Number(compareAtPriceRange.minVariantPrice.amount),
  }
}

export const shopifyButtonsTransform = (buttons: string) => {
  const parsedButtonsArray = JSON.parse(buttons ?? "[]") as {
    text?: string
    url?: string
  }[]
  return parsedButtonsArray?.map((button) => ({
    text: button.text,
    href: button.url,
  }))
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function getType(id: string) {
  if (id.includes("gid://shopify/Product")) return "product"
  if (id.includes("gid://shopify/Collection")) return "collection"
  if (id.includes("gid://shopify/Page")) return "page"
}

function getSlug(id: string, handle: string) {
  const type = getType(id)
  if (type === "product") return `products/${handle}`
  if (type === "collection") return `collections/${handle}`
  if (type === "page") return handle
}

function getHref(id: string, handle: string) {
  const type = getType(id)
  if (type === "product") return `/products/${handle}/`
  if (type === "collection") return `/collections/${handle}/`
  if (type === "page") return `/${handle}/`
}

// --------------------------------------------------------------------------
// Item
// --------------------------------------------------------------------------

export function transformShopifyItem(item: ShopifyItemSchema): ItemSchema {
  const image = item.featuredImage || item.image || undefined
  return {
    href: item.id && item.handle && getHref(item.id, item.handle),
    title: item.title,
    image: image && transformShopifyImage(image),
    price:
      item.priceRange &&
      item.compareAtPriceRange &&
      transformShopifyPrice(item.priceRange, item.compareAtPriceRange),
  }
}

// --------------------------------------------------------------------------
// Blocks
// --------------------------------------------------------------------------

function transformShopifyBlock(block: ShopifyBlockSchema): BlockSchema {
  const getField = (key: string) =>
    block.fields?.find((field) => field.key === key)

  const image = getField("image")?.reference?.image || undefined
  const buttons = getField("buttons")?.value || undefined

  return {
    type: block.type,
    title: getField("title")?.value,
    description: getField("description")?.value,
    image: image ? transformShopifyImage(image) : undefined,
    buttons: buttons ? shopifyButtonsTransform(buttons) : undefined,
    items: getField("items")?.references?.nodes.map(transformShopifyItem),
  }
}

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

export function transformShopifyPage(page: ShopifyPageSchema): PageSchema {
  const image = page.image || page.featuredImage || undefined
  return {
    id: page.id,
    slug: page.id && page.handle ? getSlug(page.id, page.handle) : undefined,
    title: page.title,
    image: image ? transformShopifyImage(image) : undefined,
    images: page.images?.nodes.map(transformShopifyImage),
    price:
      page.priceRange && page.compareAtPriceRange
        ? transformShopifyPrice(page.priceRange, page.compareAtPriceRange)
        : undefined,
    items: page.products?.nodes.map(transformShopifyItem),
    sections: page.metafield?.references.nodes.map(transformShopifyBlock),
    variants: page.variants,
    seo: {
      title: page.seo?.title || undefined,
      description: page.seo?.description || undefined,
    },
    content: page.descriptionHtml || page.body,
  }
}

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

// export function shopifyMenuTransform(menu: ShopifyMenuSchema): MenuSchema {
//   function findField(key: string) {
//     return menu?.fields?.find((field) => field.key === key)
//   }

//   function getRelativeUrl(url: string) {
//     // If the URL is from the same origin, just return the pathname
//     try {
//       const currentUrl =
//         typeof window !== "undefined" ? window.location.origin : ""
//       const urlObj = new URL(url)

//       if (currentUrl && urlObj.origin === currentUrl) {
//         return urlObj.pathname
//       }
//     } catch (error) {
//       // If URL parsing fails, continue with the default behavior
//     }
//     return new URL(url).pathname
//   }

//   return {
//     text: findField("title")?.value,
//     links: JSON.parse(findField("links")?.value ?? "[]").map((link: any) => ({
//       text: link.text,
//       href: getRelativeUrl(link.url),
//     })),
//   }
// }

// export function shopifyLayoutTransform(
//   layout: ShopifyLayoutSchema
// ): PageSchema {
//   const getField = (key: string) =>
//     layout.fields?.find((field) => field.key === key)

//   const logo = getField("logo")?.reference?.image

//   return {
//     lang: getField("language")?.value,
//     company: getField("company")?.value,
//     banner: {
//       list: JSON.parse(getField("banner")?.value ?? "[]"),
//     },
//     header: {
//       logo: logo ? transformShopifyImage(logo) : undefined,
//       menus: getField("header")?.references?.nodes.map(shopifyMenuTransform),
//     },
//     footer: {
//       logo: logo ? transformShopifyImage(logo) : undefined,
//       menus: getField("footer")?.references?.nodes.map(shopifyMenuTransform),
//     },
//   }
// }
