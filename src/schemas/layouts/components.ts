import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"

export const componentsSchema = (ctx: SchemaContext) => baseSchema(ctx).strict()

export type ComponentsSchema = z.infer<ReturnType<typeof componentsSchema>>
