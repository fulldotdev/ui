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

export type BlockProps = ItemProps & {
  image?: ImageProps
  images?: ImageProps[]
  items?: ItemProps[]
}

export type PageProps = BlockProps & {
  blocks?: BlockProps[]
  seo?: SeoSchema
}
