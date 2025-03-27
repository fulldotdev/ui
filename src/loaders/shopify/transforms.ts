import type { BlockSchema } from "@/schemas/block"
import type { ImageSchema } from "@/schemas/fields/image"
import type { MenuSchema } from "@/schemas/fields/menu"
import type { PriceSchema } from "@/schemas/fields/price"
import type { ItemSchema } from "@/schemas/item"
import type { LayoutSchema } from "@/schemas/layout"
import { pageSchema, type PageSchema } from "@/schemas/page"
import type {
  Collection,
  Image,
  Maybe,
  MediaImage,
  MetafieldReference,
  Metaobject,
  MetaobjectField,
  Page,
  Product,
  ProductPriceRange,
} from "@shopify/hydrogen-react/storefront-api-types"

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

export const shopifyButtonsTransform = (buttons: MetaobjectField["value"]) => {
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
// Type Guards
// --------------------------------------------------------------------------

function isProduct(input: Product | Collection | Page): input is Product {
  return "featuredImage" in input
}

function isCollection(input: Product | Collection | Page): input is Collection {
  return "products" in input
}

function isMetaobjects(
  input?: Maybe<MetafieldReference>[]
): input is Metaobject[] {
  return input?.every((ref) => ref && "fields" in ref) ?? false
}

function isMediaImage(input?: Maybe<MetafieldReference>): input is MediaImage {
  return (input && "image" in input) ?? false
}

// --------------------------------------------------------------------------
// Item
// --------------------------------------------------------------------------

export function transformShopifyItem(item: Product | Collection): ItemSchema {
  if (isProduct(item)) {
    return {
      href: `/products/${item.handle}/`,
      title: item.title,
      image: item.featuredImage
        ? transformShopifyImage(item.featuredImage)
        : undefined,
      price: transformShopifyPrice(item.priceRange, item.compareAtPriceRange),
    }
  }

  // isCollection
  return {
    href: `/collections/${item.handle}/`,
    title: item.title,
    image: item.image ? transformShopifyImage(item.image) : undefined,
  }
}
// --------------------------------------------------------------------------
// Blocks
// --------------------------------------------------------------------------

function transformShopifyBlock(block: Metaobject): BlockSchema {
  const getField = (key: string) =>
    block.fields?.find((field) => field.key === key)

  const imageReference = getField("image")?.reference as MediaImage
  const buttons = getField("buttons")?.value || undefined
  const items = getField("items")?.references?.nodes as (Product | Collection)[]

  return {
    type: block.type,
    title: getField("title")?.value || undefined,
    description: getField("description")?.value || undefined,
    image: imageReference?.image
      ? transformShopifyImage(imageReference.image)
      : undefined,
    buttons: buttons ? shopifyButtonsTransform(buttons) : undefined,
    items: items?.map(transformShopifyItem),
  }
}

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

export function transformShopifyPage(page: Page | Product | Collection) {
  if (isProduct(page)) {
    return {
      type: "product",
      id: page.id,
      slug: `products/${page.handle}`,
      title: page.title,
      image: page.featuredImage
        ? transformShopifyImage(page.featuredImage)
        : undefined,
      images: page.images?.nodes.map(transformShopifyImage),
      variants: page.variants,
      seo: {
        title: page.seo?.title || undefined,
        description: page.seo?.description || undefined,
      },
      content: page.descriptionHtml,
    } satisfies PageSchema
  }

  if (isCollection(page)) {
    return {
      type: "collection",
      id: page.id,
      slug: `collections/${page.handle}`,
      title: page.title,
      image: page.image ? transformShopifyImage(page.image) : undefined,
      items: page.products?.nodes.map(transformShopifyItem),
      seo: {
        title: page.seo?.title || undefined,
        description: page.seo?.description || undefined,
      },
      content: page.descriptionHtml,
    } satisfies PageSchema
  }

  // isPage
  const blocks = page.metafield?.references?.nodes as Metaobject[]
  return {
    type: "content",
    id: page.id,
    slug: page.handle,
    title: page.title,
    sections: blocks?.map(transformShopifyBlock),
    seo: {
      title: page.seo?.title || undefined,
      description: page.seo?.description || undefined,
    },
    content: page.body,
  } satisfies PageSchema
}

// --------------------------------------------------------------------------
// Menu
// --------------------------------------------------------------------------

export function transformShopifyMenu(menu: Metaobject): MenuSchema {
  function findField(key: string) {
    return menu?.fields?.find((field) => field.key === key)
  }

  return {
    text: findField("title")?.value || undefined,
    links: JSON.parse(findField("links")?.value ?? "[]").map((link: any) => ({
      text: link.text,
      href: link.url,
    })),
  }
}

// --------------------------------------------------------------------------
// Menu
// --------------------------------------------------------------------------

export function transformShopifyLayout(layout: Metaobject): LayoutSchema {
  const getField = (key: string) =>
    layout.fields?.find((field) => field.key === key)

  const logoRef = getField("logo")?.reference
  const headerRefs = getField("header")?.references?.nodes
  const footerRefs = getField("footer")?.references?.nodes

  return {
    lang: getField("language")?.value || undefined,
    company: getField("company")?.value || undefined,
    banner: {
      list: JSON.parse(getField("banner")?.value ?? "[]"),
    },
    header: {
      logo:
        isMediaImage(logoRef) && logoRef.image
          ? transformShopifyImage(logoRef.image)
          : undefined,
      menus: isMetaobjects(headerRefs)
        ? headerRefs.map(transformShopifyMenu)
        : undefined,
    },
    footer: {
      logo:
        isMediaImage(logoRef) && logoRef.image
          ? transformShopifyImage(logoRef.image)
          : undefined,
      menus: isMetaobjects(footerRefs)
        ? footerRefs.map(transformShopifyMenu)
        : undefined,
    },
  }
}
