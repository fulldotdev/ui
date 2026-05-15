import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { blockSchema } from "@/schemas/layouts/block"
import { docSchema } from "@/schemas/layouts/doc"
import { homeSchema } from "@/schemas/layouts/home"
import { overviewSchema } from "@/schemas/layouts/overview"

export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    blockSchema(ctx).extend({ type: z.literal("block") }),
    docSchema(ctx).extend({ type: z.literal("doc") }),
    homeSchema(ctx).extend({ type: z.literal("home") }),
    overviewSchema(ctx).extend({ type: z.literal("overview") }),
  ])
