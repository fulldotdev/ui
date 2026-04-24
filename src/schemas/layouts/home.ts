import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { buttonSchema, seoSchema } from "@/schemas/shared"

const featureSchema = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .strict()

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
      features: z
        .object({
          title: z.string(),
          description: z.string(),
          items: featureSchema.array().length(3),
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
