import { blockSchema } from "@/schemas/block"
import { imageSchema } from "@/schemas/fields/image"
import { z } from "zod"

export const layoutSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    lang: z.string().optional(),
    company: z.string().optional(),
    banner: blockSchema
      .extend({
        variant: z.number().default(1),
      })
      .optional(),
    header: blockSchema
      .extend({
        variant: z.number().default(1),
      })
      .optional(),
    footer: blockSchema
      .extend({
        variant: z.number().default(1),
      })
      .optional(),
    head: z.string().optional(),
    body: z.string().optional(),
    css: z.string().optional(),
  })
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
