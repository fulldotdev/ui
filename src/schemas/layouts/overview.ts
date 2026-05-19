import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const overviewSchema = (ctx: SchemaContext) => baseSchema(ctx).strict()

export type OverviewSchema = z.infer<ReturnType<typeof overviewSchema>>
