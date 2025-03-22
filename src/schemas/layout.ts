import { blockSchema } from "@/schemas/block"
import { z } from "zod"

export const layoutSchema = z
  .object({
    lang: z.string().optional(),
    company: z.string().optional(),
    banner: blockSchema.optional(),
    header: blockSchema.optional(),
    footer: blockSchema.optional(),
    head: z.string().optional(),
    body: z.string().optional(),
    css: z.string().optional(),
  })
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
