import { blockSchema } from "@/schemas/block"
import { importSchema } from "@/schemas/fields/import"
import { z } from "zod"

export const layoutSchema = z
  .object({
    lang: z.string(),
    company: z.string(),
    banner: importSchema.pipe(blockSchema).or(blockSchema),
    header: importSchema.pipe(blockSchema).or(blockSchema),
    footer: importSchema.pipe(blockSchema).or(blockSchema),
    head: z.string(),
    body: z.string(),
    css: z.string(),
  })
  .partial()
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
