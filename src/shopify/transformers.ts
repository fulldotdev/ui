import type {
  Collection,
  Image,
  Product,
  ProductPriceRange,
} from "@shopify/hydrogen-react/storefront-api-types"

import type { ImageSchema } from "../schemas/fields/image"
import type { PriceSchema } from "../schemas/fields/price"
import type { PageSchema } from "../schemas/page"

// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

function transformShopifyImage(image: Image): ImageSchema {
  return {
    src: image.url,
    alt: image.altText ?? undefined,
  }
}

function transformShopifyPrice(
  priceRange: ProductPriceRange,
  compareAtPriceRange: ProductPriceRange
): PriceSchema {
  return {
    amount: Number(priceRange.minVariantPrice.amount),
    currency: priceRange.minVariantPrice.currencyCode,
    compare: Number(compareAtPriceRange.minVariantPrice.amount),
  }
}

// --------------------------------------------------------------------------
// Product
// --------------------------------------------------------------------------

export function transformShopifyProduct(product: Product): {
  collection: string
  id: string
  data?: PageSchema
  body?: string
} {
  return {
    collection: "pages",
    id: `products/${product.handle}`,
    data: {
      type: "product",
      id: product.id,
      title: product.title,
      image: product.featuredImage
        ? transformShopifyImage(product.featuredImage)
        : undefined,
      images: product.images?.nodes.map(transformShopifyImage),
      price: transformShopifyPrice(
        product.priceRange,
        product.compareAtPriceRange
      ),
      variants: product.variants,
      seo: {
        title: product.seo?.title || undefined,
        description: product.seo?.description || undefined,
      },
    },
    body: product.descriptionHtml,
  }
}

// --------------------------------------------------------------------------
// Collection
// --------------------------------------------------------------------------

export function transformShopifyCollection(collection: Collection): {
  collection: string
  id: string
  data?: PageSchema
  body?: string
} {
  return {
    collection: "pages",
    id: `collections/${collection.handle}`,
    data: {
      type: "collection",
      id: collection.id,
      title: collection.title,
      image: collection.image
        ? transformShopifyImage(collection.image)
        : undefined,
      items: collection.products?.nodes.map((product) => ({
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
      seo: {
        title: collection.seo?.title || undefined,
        description: collection.seo?.description || undefined,
      },
    },
    body: collection.descriptionHtml,
  }
}
