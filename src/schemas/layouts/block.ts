import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const blockSchema = (ctx: SchemaContext) => baseSchema(ctx).strict()

export type BlockSchema = z.infer<ReturnType<typeof blockSchema>>
