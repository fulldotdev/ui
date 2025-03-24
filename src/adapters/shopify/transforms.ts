import type {
  ShopifyBlockSchema,
  ShopifyImageSchema,
  ShopifyItemSchema,
  ShopifyLayoutSchema,
  ShopifyMenuSchema,
  ShopifyPageSchema,
  ShopifySeoSchema,
} from "@/adapters/shopify/schemas"
import type { BlockSchema } from "@/schemas/block"
import { type ImageSchema } from "@/schemas/fields/image"
import type { MenuSchema } from "@/schemas/fields/menu"
import type { PriceSchema } from "@/schemas/fields/price"
import type { ItemSchema } from "@/schemas/item"
import type { LayoutSchema } from "@/schemas/layout"
import type { PageSchema } from "@/schemas/page"

// --------------------------------------------------------------------------
// Shared
// --------------------------------------------------------------------------

export const shopifyImageTransform = (
  image?: ShopifyImageSchema
): ImageSchema => ({
  src: image?.url,
  alt: image?.altText ?? undefined,
})

export const shopifySeoTransform = (
  seo?: ShopifySeoSchema
): PageSchema["seo"] => ({
  title: seo?.title ?? undefined,
  description: seo?.description ?? undefined,
})

export const shopifyButtonsTransform = (
  buttons?: ShopifyBlockSchema["fields"][number]
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

export const shopifyPriceTransform = (page: ShopifyPageSchema): PriceSchema => {
  return {
    amount: Number(page.priceRange?.minVariantPrice.amount) || undefined,
    currency: page.priceRange?.minVariantPrice.currencyCode,
    compare:
      Number(page.compareAtPriceRange?.minVariantPrice.amount) || undefined,
  }
}

function getPageType(id?: string) {
  if (id?.includes("Product")) return "product"
  if (id?.includes("Collection")) return "collection"
  if (id?.includes("Article")) return "post"
  return "content"
}

function getPageSlug(id?: string, handle?: string) {
  if (id?.includes("Product")) return `producten/${handle}`
  if (id?.includes("Collection")) return `collecties/${handle}`
  if (id?.includes("Article")) return `blog/${handle}`
  return handle
}

function getPageHref(id?: string, handle?: string) {
  if (id?.includes("Product")) return `/producten/${handle}/`
  else if (id?.includes("Collection")) return `/collecties/${handle}/`
  else if (id?.includes("Article")) return `/blog/${handle}/`
  else if (id?.includes("Page") && handle === "home") return `/`
  return `/${handle}/`
}

// --------------------------------------------------------------------------
// Item
// --------------------------------------------------------------------------

export function shopifyItemTransform(item: ShopifyItemSchema): ItemSchema {
  return {
    href: getPageHref(item.id, item.handle),
    title: item.title,
    image: shopifyImageTransform(item.featuredImage || item.image),
    price: shopifyPriceTransform(item),
  }
}

// --------------------------------------------------------------------------
// Block
// --------------------------------------------------------------------------

// TODO move to a different file
const blockPropsMap: Record<string, BlockSchema & { variant: number }> = {
  hero: {
    variant: 3,
    align: "start",
  },
  products: {
    variant: 1,
    align: "start",
  },
  collections: {
    variant: 1,
    align: "start",
  },
  media: {
    variant: 2,
    align: "center",
  },
  contact: {
    variant: 1,
    align: "start",
    form: {
      fields: [
        {
          type: "text",
          label: "Naam",
        },
        {
          type: "email",
          label: "Email",
          required: true,
        },
        {
          type: "tel",
          label: "Telefoon",
        },
        {
          type: "textarea",
          label: "Bericht",
        },
      ],
      submit: "Verstuur",
    },
  },
}

export function shopifyBlockTransform(block: ShopifyBlockSchema): BlockSchema {
  const getField = (key: (typeof block.fields)[number]["key"]) =>
    block.fields?.find((field) => field.key === key)

  return {
    type: block.type,
    title: getField("title")?.value,
    description: getField("description")?.value,
    image: shopifyImageTransform(getField("image")?.reference?.image),
    buttons: shopifyButtonsTransform(getField("buttons")),
    items: getField("items")?.references?.nodes.map(shopifyItemTransform),
    ...blockPropsMap[block.type],
  }
}

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------

export const shopifyPageTransform = (page: ShopifyPageSchema): PageSchema => {
  return {
    id: page.id,
    type: getPageType(page.id),
    variant: 1,
    slug: getPageSlug(page.id, page.handle),
    href: getPageHref(page.id, page.handle),
    title: page.title,
    image: shopifyImageTransform(page.featuredImage || page.image),
    images: page.images?.nodes.map(shopifyImageTransform),
    price: shopifyPriceTransform(page),
    variants: page.variants,
    sections: page.metafield?.references?.nodes.map(shopifyBlockTransform),
    items:
      page.products?.nodes.map(shopifyItemTransform) ||
      page.collections?.nodes.map(shopifyItemTransform),
    seo: shopifySeoTransform(page.seo),
    content: page.descriptionHtml || page.body || undefined,
  }
}

// --------------------------------------------------------------------------
// Layout
// --------------------------------------------------------------------------

export function shopifyMenuTransform(menu: ShopifyMenuSchema): MenuSchema {
  function findField(key: string) {
    return menu?.fields?.find((field) => field.key === key)
  }

  return {
    text: findField("title")?.value,
    links: JSON.parse(findField("links")?.value ?? "[]"),
  }
}

export function shopifyLayoutTransform(
  layout: ShopifyLayoutSchema
): LayoutSchema {
  const getField = (key: string) =>
    layout.fields?.find((field) => field.key === key)

  return {
    lang: getField("language")?.value,
    company: getField("company")?.value,
    banner: {
      variant: 1,
      list: JSON.parse(getField("banner")?.value ?? "[]"),
    },
    header: {
      variant: 2,
      logo: shopifyImageTransform(getField("logo")?.reference?.image),
      menus: getField("header")?.references?.nodes.map(shopifyMenuTransform),
    },
    footer: {
      variant: 1,
      logo: shopifyImageTransform(getField("logo")?.reference?.image),
      menus: getField("footer")?.references?.nodes.map(shopifyMenuTransform),
    },
  }
}
