import type {
  ShopifyCollectionsSchema,
  ShopifyImageSchema,
  ShopifyPagesSchema,
  ShopifyProductPriceRangeSchema,
  ShopifyProductsSchema,
  ShopifySectionSchema,
  ShopifySeoSchema,
} from "@/loaders/shopify/schemas"
import type { BlockSchema } from "@/schemas/block"
import type { ImageSchema } from "@/schemas/fields/image"
import type { PriceSchema } from "@/schemas/fields/price"
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

function transformShopifySeo(seo: ShopifySeoSchema): PageSchema["seo"] {
  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
  }
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

export const shopifyButtonsTransform = (
  buttons?: ShopifySectionSchema["fields"][number]
) => {
  const parsedButtonsArray = JSON.parse(buttons?.value ?? "[]") as {
    text: string
    url: string
  }[]
  return (
    parsedButtonsArray?.map((button) => ({
      text: button.text,
      href: button.url,
    })) ?? []
  )
}

// --------------------------------------------------------------------------
// Products
// --------------------------------------------------------------------------

export function transformShopifyProduct(
  product: ShopifyProductsSchema["products"]["nodes"][number]
): PageSchema {
  return {
    id: product.id,
    slug: `products/${product.handle}`,
    title: product.title,
    image: product.featuredImage
      ? transformShopifyImage(product.featuredImage)
      : undefined,
    images: product.images.nodes.map(transformShopifyImage),
    price: transformShopifyPrice(
      product.priceRange,
      product.compareAtPriceRange
    ),
    variants: product.variants,
    seo: transformShopifySeo(product.seo),
    content: product.descriptionHtml,
  }
}

// --------------------------------------------------------------------------
// Collections
// --------------------------------------------------------------------------

export function transformShopifyCollection(
  collection: ShopifyCollectionsSchema["collections"]["nodes"][number]
): PageSchema {
  return {
    id: collection.id,
    slug: `collections/${collection.handle}`,
    title: collection.title,
    image: collection.image
      ? transformShopifyImage(collection.image)
      : undefined,
    items: collection.products.nodes.map((product) => ({
      href: `/products/${product.handle}/`,
      title: product.title,
      image: product.featuredImage
        ? transformShopifyImage(product.featuredImage)
        : undefined,
      price: transformShopifyPrice(
        product.priceRange,
        product.compareAtPriceRange
      ),
    })),
    seo: transformShopifySeo(collection.seo),
    content: collection.descriptionHtml,
  }
}

// --------------------------------------------------------------------------
// Section
// --------------------------------------------------------------------------

function shopifySectionTransform(section: ShopifySectionSchema): BlockSchema {
  const getField = (key: (typeof section.fields)[number]["key"]) =>
    section.fields?.find((field) => field.key === key)

  return {
    type: section.type,
    title: getField("title")?.value,
    description: getField("description")?.value,
    image: transformShopifyImage(getField("image")?.reference?.image),
    buttons: shopifyButtonsTransform(getField("buttons")),
    items: getField("items")?.references?.nodes.map((item) => ({
      href: `/${item.handle}/`,
      title: item.title,
      image: transformShopifyImage(item.featuredImage),
      price: transformShopifyPrice(item.priceRange, item.compareAtPriceRange),
    })),
  }
}

// --------------------------------------------------------------------------
// Pages
// --------------------------------------------------------------------------

export function transformShopifyPages(response: ShopifyPagesSchema) {
  return response.pages.nodes.map((page) => {
    return {
      id: page.id,
      slug: page.handle,
      title: page.title,
      sections: page.metafield.references.nodes.map(shopifySectionTransform),
      content: page.body,
      seo: transformShopifySeo(page.seo),
    } satisfies PageSchema
  })
}
