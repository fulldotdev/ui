import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { docSchema } from "@/schemas/layouts/doc"
import { homeSchema } from "@/schemas/layouts/home"

export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    docSchema(ctx).extend({ type: z.literal("doc") }),
    homeSchema(ctx).extend({ type: z.literal("home") }),
  ])
