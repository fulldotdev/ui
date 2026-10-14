import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { linkSchema } from "@/schemas/shared"

const sectionSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const tileSchema = z.object({
  label: z.string(),
  description: z.string(),
  href: z.string(),
})

export const homeSchema = (ctx: SchemaContext) =>
  baseSchema(ctx)
    .extend({
      hero: z.object({
        // The framework names in the title show as their logos.
        title: z.string(),
        description: z.string(),
        copyLabel: z.string(),
        frameworks: z
          .object({
            name: z.enum(["astro", "react"]),
            label: z.string(),
            description: z.string(),
            command: z.string(),
            note: linkSchema.optional(),
            href: z.string(),
          })
          .array(),
        // Tile labels follow the number of items, such as "82 blocks".
        blocks: tileSchema,
        components: tileSchema,
        presets: tileSchema,
      }),
      blocks: sectionSchema.extend({
        button: linkSchema,
        categories: linkSchema.array(),
      }),
      features: sectionSchema.extend({
        features: z
          .object({
            title: z.string(),
            description: z.string(),
            icon: z.string(),
          })
          .array(),
      }),
      presets: sectionSchema.extend({
        useLabel: z.string(),
        activeLabel: z.string(),
        custom: tileSchema.extend({ button: z.string() }),
      }),
      faqs: sectionSchema.extend({
        faqs: z.object({ question: z.string(), answer: z.string() }).array(),
      }),
    })
    .strict()

export type HomeSchema = z.infer<ReturnType<typeof homeSchema>>
