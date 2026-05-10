import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const docSchema = (ctx: SchemaContext) => baseSchema(ctx).loose()

export type DocSchema = z.infer<ReturnType<typeof docSchema>>
