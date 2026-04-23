import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseLayoutSchema } from "@/schemas/layouts/base"
import { docsLayoutSchema } from "@/schemas/layouts/docs"
import { homeLayoutSchema } from "@/schemas/layouts/home"

export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    baseLayoutSchema(ctx).extend({ type: z.literal("base") }),
    docsLayoutSchema.extend({ type: z.literal("docs") }),
    baseLayoutSchema(ctx).extend({ type: z.literal("header") }),
    baseLayoutSchema(ctx).extend({ type: z.literal("sidebar") }),
    homeLayoutSchema(ctx).extend({ type: z.literal("home") }),
  ])
