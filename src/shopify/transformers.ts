import type {
  Article,
  Blog,
  Collection,
  Image,
  Product,
  ProductPriceRange,
  ShopPolicy,
  ShopPolicyWithDefault,
} from "@shopify/hydrogen-react/storefront-api-types"

import type { Page } from "../content.config"
import type { ImageSchema } from "../schemas/fields/image"
import type { PriceSchema } from "../schemas/fields/price"

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
  data?: Page
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
  data?: Page
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

// --------------------------------------------------------------------------
// Article
// --------------------------------------------------------------------------

export function transformShopifyArticle(article: Article): {
  collection: string
  id: string
  data?: Page
  body?: string
} {
  return {
    collection: "pages",
    id: `blogs/${article.blog.handle}/${article.handle}`,
    data: {
      type: "post",
      id: article.id,
      title: article.title,
      image: article.image ? transformShopifyImage(article.image) : undefined,
      seo: {
        title: article.seo?.title || undefined,
        description: article.seo?.description || undefined,
      },
    },
    body: article.contentHtml,
  }
}

// --------------------------------------------------------------------------
// Blog
// --------------------------------------------------------------------------

export function transformShopifyBlog(blog: Blog): {
  collection: string
  id: string
  data?: Page
  body?: string
} {
  return {
    collection: "pages",
    id: `blogs/${blog.handle}`,
    data: {
      type: "blog",
      id: blog.id,
      title: blog.title,
      items: blog.articles?.nodes.map((article) => ({
        href: `/blogs/${blog.handle}/${article.handle}`,
        title: article.title,
        description: article.excerptHtml,
        image: article.image ? transformShopifyImage(article.image) : undefined,
      })),
      // TODO: simply use refs
      // items: blog.articles?.nodes.map(
      //   (article) => `src/content/pages/blogs/${blog.handle}/${article.handle}`
      // ),
      seo: {
        title: blog.seo?.title || undefined,
        description: blog.seo?.description || undefined,
      },
    },
  }
}

// --------------------------------------------------------------------------
// Policy
// --------------------------------------------------------------------------

export function transformShopifyPolicy(
  policy: ShopPolicy | ShopPolicyWithDefault
): {
  collection: string
  id: string
  data?: Page
  body?: string
} {
  return {
    collection: "pages",
    id: `policies/${policy.handle}`,
    data: {
      type: "content",
      id: policy.id,
      title: policy.title,
      body: policy.body,
    },
    body: policy.body,
  }
}
