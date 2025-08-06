import type { BlockSchema, ItemSchema, PageSchema } from "@/lib/schemas"

export type ImageProps = {
  src: string
  alt: string
  [key: string]: any
}

export type ItemProps = Omit<ItemSchema, "image" | "images"> & {
  image?: ImageProps
  images?: ImageProps[]
}

export type BlockProps = Omit<BlockSchema, "image" | "images" | "items"> & {
  image?: ImageProps
  images?: ImageProps[]
  items?: ItemProps[]
  children?: React.ReactNode
}

export type PageProps = Omit<
  PageSchema,
  | "banner"
  | "header"
  | "blocks"
  | "footer"
  | "legal"
  | "image"
  | "images"
  | "items"
> & {
  image?: ImageProps
  images?: ImageProps[]
  items?: ItemProps[]
  banner?: BlockProps
  header?: BlockProps
  blocks?: BlockProps[]
  footer?: BlockProps
  legal?: BlockProps
}
