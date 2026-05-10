import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const blocksSchema = (ctx: SchemaContext) => baseSchema(ctx).strict()

export type BlocksSchema = z.infer<ReturnType<typeof blocksSchema>>
