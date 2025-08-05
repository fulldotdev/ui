import type {
  BlockSchema,
  ItemSchema,
  LayoutSchema,
  PageSchema,
} from "@/lib/schemas"

export type ImageProps = any

export type ItemProps = Omit<ItemSchema, "image" | "images"> & {
  image?: ImageProps
  images?: ImageProps[]
}

export type BlockProps = Omit<
  BlockSchema,
  "image" | "images" | "items" | "html"
> & {
  image?: ImageProps
  images?: ImageProps[]
  items?: ItemProps[]
  children?: React.ReactNode
}

export type LayoutProps = Omit<
  LayoutSchema,
  "banner" | "header" | "footer" | "legal"
> & {
  banner?: BlockProps
  header?: BlockProps
  footer?: BlockProps
  legal?: BlockProps
}

export type PageProps = LayoutProps &
  Omit<PageSchema, "image" | "images" | "items" | "blocks"> & {
    image?: ImageProps
    images?: ImageProps[]
    items?: ItemProps[]
    blocks?: BlockProps[]
  }
