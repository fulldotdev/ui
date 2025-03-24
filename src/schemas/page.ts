import { blockSchema } from "@/schemas/block"
import { z } from "zod"

export const pageSchema = blockSchema
  .extend({
    type: z
      .enum(["content", "post", "product", "collection"])
      .default("content"),
    variant: z.number().default(1),
    sections: blockSchema
      .extend({
        type: z.string(),
        variant: z.number().default(1),
      })
      .array()
      .optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    content: z.string().optional(),
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
