import type { BlockSchema, ItemSchema, PageSchema } from "@/lib/schemas"

export type ItemProps = ItemSchema

export type BlockProps = Omit<BlockSchema, "entries">

export type PageProps = Omit<PageSchema, "entries" | "blocks"> & {
  blocks?: BlockProps[]
}
