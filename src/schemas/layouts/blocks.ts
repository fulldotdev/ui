import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { seoSchema } from "@/schemas/shared"

export const blocksSchema = (ctx: SchemaContext) =>
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      seo: seoSchema(ctx).optional(),
    })
    .strict()

export type BlocksSchema = z.infer<ReturnType<typeof blocksSchema>>
