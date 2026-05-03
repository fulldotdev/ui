import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { buttonSchema, seoSchema } from "@/schemas/shared"

export const homeSchema = (ctx: SchemaContext) =>
  z
    .object({
      hero: z
        .object({
          title: z.string(),
          description: z.string(),
          buttons: buttonSchema.array().length(2),
        })
        .strict(),
      cta: z
        .object({
          title: z.string(),
          description: z.string(),
          buttons: buttonSchema.array().length(2),
        })
        .strict(),
      seo: seoSchema(ctx),
    })
    .strict()

export type HomeSchema = z.infer<ReturnType<typeof homeSchema>>
