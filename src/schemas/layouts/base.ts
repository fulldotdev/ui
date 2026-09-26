import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { imageSchema, seoSchema } from "@/schemas/shared"

export const baseSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    updatedAt: z.coerce.date().optional(),
    image: imageSchema(ctx).optional(),
    seo: seoSchema(ctx).optional(),
  })

export type BaseSchema = z.infer<ReturnType<typeof baseSchema>>
