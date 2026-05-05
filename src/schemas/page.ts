import { type SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { blockSchema } from "@/schemas/layouts/block"
import { blocksSchema } from "@/schemas/layouts/blocks"
import { docSchema } from "@/schemas/layouts/doc"
import { homeSchema } from "@/schemas/layouts/home"

export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    blockSchema(ctx).extend({ type: z.literal("block") }),
    blocksSchema(ctx).extend({ type: z.literal("blocks") }),
    docSchema(ctx).extend({ type: z.literal("doc") }),
    homeSchema(ctx).extend({ type: z.literal("home") }),
  ])
