import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { buttonSchema } from "@/schemas/shared"

export const homeSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
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
    })
    .strict()

export type HomeSchema = z.infer<ReturnType<typeof homeSchema>>
