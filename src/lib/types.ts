import config from "fulldev.config.json"
import { z } from "zod"

import { blockSchema, formSchema } from "@/lib/schemas"

export type BlockSchema = z.infer<typeof blockSchema>
export type BlockProps = Omit<
  z.infer<typeof blockSchema>,
  keyof typeof config | "form"
> & {
  form?: z.infer<typeof formSchema>
}
