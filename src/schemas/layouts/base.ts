import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { seoSchema } from "@/schemas/shared"

export const baseLayoutSchema = (ctx: SchemaContext) =>
  z.object({
    slug: z.string().optional(),
    seo: seoSchema(ctx),
  })

export type BaseLayoutSchema = z.infer<ReturnType<typeof baseLayoutSchema>>
