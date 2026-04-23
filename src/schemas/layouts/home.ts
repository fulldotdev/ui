import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { buttonSchema, seoSchema } from "@/schemas/shared"

const featureSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  })
  .strict()

export const homeLayoutSchema = (ctx: SchemaContext) =>
  z
    .object({
      hero: z
        .object({
          title: z.string(),
          description: z.string(),
          button1: buttonSchema,
          button2: buttonSchema,
        })
        .strict(),
      features: z
        .object({
          title: z.string(),
          description: z.string(),
          feature1: featureSchema,
          feature2: featureSchema,
          feature3: featureSchema,
        })
        .strict(),
      cta: z
        .object({
          title: z.string(),
          description: z.string(),
          button1: buttonSchema,
          button2: buttonSchema,
        })
        .strict(),
      seo: seoSchema(ctx),
    })
    .strict()

export type HomeLayoutSchema = z.infer<ReturnType<typeof homeLayoutSchema>>
