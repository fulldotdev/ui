import type {
  ShopifyCollectionSchema,
  ShopifyImageSchema,
  ShopifyPageSchema,
  ShopifyProductSchema,
  ShopifySectionSchema,
  ShopifySeoSchema,
} from "@/adapters/shopify/schemas"
import {
  shopifyImageSchema,
  shopifySeoSchema,
} from "@/adapters/shopify/schemas"
import { imageSchema, type ImageSchema } from "@/schemas/components/image"
import type { PriceSchema } from "@/schemas/components/price"
import type { LayoutSchema } from "@/schemas/content/layout"
import type { PageSchema } from "@/schemas/content/page"
import type { SectionSchema } from "@/schemas/content/section"
import type { SeoSchema } from "@/schemas/content/seo"
import type {
  Article,
  Collection,
  Image,
  MediaImage,
  Metaobject,
  MetaobjectField,
  Page,
  Product,
  Seo,
} from "@shopify/hydrogen-react/storefront-api-types"

export const shopifyImageTransform = (
  image?: ShopifyImageSchema
): ImageSchema => ({
  src: image?.url,
  alt: image?.altText ?? undefined,
})

export const shopifySeoTransform = (seo?: ShopifySeoSchema): SeoSchema => ({
  title: seo?.title ?? undefined,
  description: seo?.description ?? undefined,
})

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

export const shopifyPriceTransform = (
  product: ShopifyProductSchema
): PriceSchema => {
  return {
    amount: Number(product.priceRange?.minVariantPrice.amount),
    currency: product.priceRange?.minVariantPrice.currencyCode,
    compare: Number(product.compareAtPriceRange?.minVariantPrice.amount),
  }
}

export const shopifyProductTransform = (
  product: ShopifyProductSchema
): PageSchema => {
  return {
    id: product.id,
    href: `/producten/${product.handle}/`,
    title: product.title,
    image: shopifyImageTransform(product.featuredImage),
    images: product.images?.nodes.map(shopifyImageTransform),
    price: shopifyPriceTransform(product),
    variants: product.variants?.nodes,
    seo: shopifySeoTransform(product.seo),
    body: product.descriptionHtml ?? undefined,
  }
}

export const shopifyCollectionTransform = (
  collection: ShopifyCollectionSchema
): PageSchema => {
  return {
    id: collection.id,
    href: `/collecties/${collection.handle}/`,
    title: collection.title,
    image: shopifyImageTransform(collection.image),
    products: collection.products?.nodes.map(shopifyProductTransform),
    seo: shopifySeoTransform(collection.seo),
    body: collection.descriptionHtml ?? undefined,
  }
}

export const shopifySectionTransform = (
  section: ShopifySectionSchema
): SectionSchema => {
  const getField = (key: string) =>
    section.fields?.find((field) => field.key === key)

  return {
    type: section.type,
    title: getField("title")?.value,
    description: getField("description")?.value,
    image: shopifyImageTransform(getField("image")?.reference?.image),
    buttons: shopifyButtonsTransform(getField("buttons")),
    products: getField("products")?.references?.nodes.map(
      shopifyProductTransform
    ),
    // collections: getField("collections")?.references?.nodes.map(
    //   shopifyCollectionTransform
    // ),
  }
}

export const shopifyPageTransform = (page: ShopifyPageSchema): PageSchema => {
  return {
    id: page.id,
    href: `/${page.handle}/`,
    title: page.title,
    sections: page.metafield?.references?.nodes.map((node) => {
      const section = node as Metaobject

      function getField(key: string) {
        return section.fields?.find((field) => field.key === key)
      }

      const imageReference = getField("image")?.reference as
        | MediaImage
        | undefined

      const productNodes = section?.fields?.find(
        (field) => field.key === "products"
      )?.references?.nodes as Partial<Product>[] | undefined

      const collectionNodes = section?.fields?.find(
        (field) => field.key === "collections"
      )?.references?.nodes as Partial<Collection>[] | undefined

      return {
        type: section.type as any,
        title: getField("title")?.value ?? undefined,
        description: getField("description")?.value ?? undefined,
        image: transformMediaImage(imageReference),
        products: productNodes?.map(transformProduct),
        collections: collectionNodes?.map(transformCollection),
        buttons: transformButtons(getField("buttons")),
      }
    }),
    seo: transformSeo(page.seo),
    body: page.body ?? undefined,
  }
}

export function transformSearch(search: Partial<Page | Article | Product>) {
  let folderSlug = ""
  if (search.id?.includes("Product")) folderSlug = "producten"
  if (search.id?.includes("Article")) folderSlug = "artikelen"

  let itemSlug = ""
  if (search.handle !== "index" && search.handle !== "home")
    itemSlug = search.handle ?? ""

  const fullSlug = `${folderSlug}/${itemSlug}`
  const withLeadingSlash = fullSlug.startsWith("/") ? fullSlug : `/${fullSlug}`
  const withTrailingSlash = fullSlug.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`

  return { text: search.title, href: withTrailingSlash }
}

export const transformLayout = (layout: Partial<Metaobject>): LayoutSchema => {
  const getField = (key: string) =>
    layout.fields?.find((field) => field.key === key)

  const footerMenuNodes = getField("footer")?.references
    ?.nodes as Partial<Metaobject>[]
  const footerMenus = footerMenuNodes?.map((menu) => ({
    text: menu?.fields?.find((field) => field.key === "title")?.value,
    links: JSON.parse(
      menu?.fields?.find((field) => field.key === "links")?.value ?? "[]"
    ).map((link: any) => ({
      text: link.text,
      href: link.url,
    })),
  }))

  const headerMenuNodes = getField("header")?.references
    ?.nodes as Partial<Metaobject>[]
  const headerMenus = headerMenuNodes?.map((menu) => ({
    text: menu?.fields?.find((field) => field.key === "title")?.value,
    links: JSON.parse(
      menu?.fields?.find((field) => field.key === "links")?.value ?? "[]"
    ).map((link: any) => ({
      text: link.text,
      href: link.url,
    })),
  }))

  const bannerItems = JSON.parse(getField("banner")?.value ?? "[]")

  const logoReference = getField("logo")?.reference as MediaImage | undefined

  console.log({ logoReference })

  return {
    lang: getField("language")?.value ?? undefined,
    company: getField("company")?.value ?? undefined,
    banner: {
      items: bannerItems,
    },
    header: {
      logo: transformMediaImage(logoReference),
      menus: headerMenus,
    },
    footer: {
      logo: transformMediaImage(logoReference),
      menus: footerMenus,
    },
  }
}
