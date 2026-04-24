import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { seoSchema } from "@/schemas/shared"

export const docSchema = (ctx: SchemaContext) =>
  z.looseObject({
    title: z.string(),
    description: z.string().optional(),
    seo: seoSchema(ctx).optional(),
  })

export type DocSchema = z.infer<ReturnType<typeof docSchema>>
