import type { ButtonSchema } from "@/schemas/components/button"
import type { ImageSchema } from "@/schemas/components/image"
import type { PriceSchema } from "@/schemas/components/price"
import type { PageSchema } from "@/schemas/content/page"
import type {
  Article,
  Collection,
  Image,
  MediaImage,
  Metafield,
  Metaobject,
  MetaobjectField,
  Page,
  Product,
  Seo,
} from "@shopify/hydrogen-react/storefront-api-types"

export const transformImage = (image?: Image | null) => {
  return {
    src: image?.url,
    alt: image?.altText ?? undefined,
  }
}

export const transformImages = (images?: Image[] | null) => {
  return images?.map(transformImage) ?? []
}

export const transformSeo = (seo?: Seo | null) => {
  return {
    title: seo?.title ?? undefined,
    description: seo?.description ?? undefined,
  }
}

export const transformMediaImage = (media?: MediaImage | null) => {
  return {
    src: media?.image?.url ?? undefined,
    alt: media?.image?.altText ?? undefined,
  }
}

export const transformButtons = (buttons?: MetaobjectField | null) => {
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

export const transformPrice = (product: Partial<Product>) => {
  return {
    amount: Number(product.priceRange?.minVariantPrice.amount),
    currency: product.priceRange?.minVariantPrice.currencyCode ?? undefined,
    compare:
      Number(product.compareAtPriceRange?.minVariantPrice.amount) ?? undefined,
  }
}

export const transformProduct = (product: Partial<Product>): PageSchema => {
  return {
    href: `/producten/${product.handle}/`,
    id: product.id,
    title: product.title,
    image: transformImage(product.featuredImage),
    images: transformImages(product.images?.nodes),
    price: transformPrice(product),
    variants: product.variants?.nodes,
    seo: transformSeo(product.seo),
    body: product.descriptionHtml ?? undefined,
  }
}

export const transformCollection = (
  collection: Partial<Collection>
): PageSchema => {
  return {
    href: `/collecties/${collection.handle}/`,
    title: collection.title,
    image: transformImage(collection.image),
    products: collection.products?.nodes.map(transformProduct),
    seo: transformSeo(collection.seo),
    body: collection.descriptionHtml ?? undefined,
  }
}

export const transformPage = (page: Partial<Page>): PageSchema => {
  return {
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
        variant: 1,
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

export const transformLayout = (layout: Partial<Metaobject>) => {
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

  const banner = JSON.parse(getField("banner")?.value ?? "[]")

  return {
    footerMenus,
    headerMenus,
    banner,
  }
}
