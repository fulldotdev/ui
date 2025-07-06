import config from "fulldev.config.json"
import { z } from "zod"

import { blockSchema, entrySchema, formSchema } from "@/lib/schemas"

export type EntrySchema = z.infer<typeof entrySchema>

export type BlockSchema = z.infer<typeof blockSchema>
export type BlockProps = Omit<
  z.infer<typeof blockSchema>,
  keyof typeof config | "form"
> & {
  form?: z.infer<typeof formSchema>
}
