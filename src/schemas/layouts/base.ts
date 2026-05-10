import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { imageSchema, seoSchema } from "@/schemas/shared"

export const baseSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    image: imageSchema(ctx).optional(),
    seo: seoSchema(ctx).optional(),
  })

export type BaseSchema = z.infer<ReturnType<typeof baseSchema>>
