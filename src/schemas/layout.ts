import { z } from "zod"

import { blockSchema } from "@/schemas/block"
import { imageSchema } from "@/schemas/fields/image"

export const layoutSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    company: z.string(),
    lang: z.string(),
    banner: blockSchema,
    header: blockSchema,
    footer: blockSchema,
    head: z.string(),
    body: z.string(),
    css: z.string(),
  })
  .partial()

export type LayoutSchema = z.infer<typeof layoutSchema>
