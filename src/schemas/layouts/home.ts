import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const homeSchema = (ctx: SchemaContext) =>
  baseSchema(ctx).extend({}).strict()

export type HomeSchema = z.infer<ReturnType<typeof homeSchema>>
