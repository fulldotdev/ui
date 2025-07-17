import type { FormSchema, ItemSchema } from "@/lib/schemas"

export type BlockProps = ItemSchema & {
  items?: ItemSchema[]
  form?: FormSchema
}
