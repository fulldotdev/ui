import { blockSchema } from "@/schemas/block"
import { z } from "zod"

export const pageSchema = blockSchema
  .extend({
    slug: z.string().optional(),
    href: z.string().optional(),
    type: z
      .enum(["content", "post", "product", "collection"])
      .default("content"),
    variant: z.number().default(1),
    sections: blockSchema.array().optional(),
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
