import type { ImageSchema, ItemSchema, SeoSchema } from "@/lib/schemas"

export type ImageProps = ImageSchema & {
  srcSet?: string
  width?: number
  height?: number
  format?: string
  quality?: number
  aspectRatio?: number
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

export type PageProps = BlockProps & {
  blocks?: BlockProps[]
  seo?: SeoSchema
}
