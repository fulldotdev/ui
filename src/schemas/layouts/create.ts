import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const createSchema = (ctx: SchemaContext) => baseSchema(ctx)

export type CreateSchema = z.infer<ReturnType<typeof createSchema>>
