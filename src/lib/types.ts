import type {
  ImageSchema,
  ItemSchema,
  PageSchema,
  SeoSchema,
} from "@/lib/schemas"

export type ImageProps = {
  fetchPriority: string
  decoding: string
  loading: string
  height?: number
  width?: number
  sizes?: string
  alt: string
  src: string
  srcSet?: string
}

export type ItemProps = Omit<ItemSchema, "image" | "images"> & {
  image?: ImageProps
  images?: ImageProps[]
}

export type BlockProps = Omit<ItemProps, "children"> & {
  image?: ImageProps
  images?: ImageProps[]
  items?: ItemProps[]
  children?: React.ReactNode
}

export type PageProps = Omit<
  PageSchema,
  | "image"
  | "images"
  | "items"
  | "banner"
  | "header"
  | "footer"
  | "legal"
  | "blocks"
> & {
  image?: ImageProps
  images?: ImageProps[]
  items?: ItemProps[]
  banner?: BlockProps
  header?: BlockProps
  footer?: BlockProps
  legal?: BlockProps
  blocks?: BlockProps[]
}
