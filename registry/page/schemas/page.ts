import type { SchemaContext } from "astro:content"
import { z } from "astro/zod"

import { baseSchema } from "@/schemas/layouts/base"
import { overviewSchema } from "@/schemas/layouts/overview"

export const pageSchema = (ctx: SchemaContext) =>
  z.discriminatedUnion("type", [
    baseSchema(ctx)
      .extend({ type: z.literal("page") })
      .strict(),
    overviewSchema(ctx).extend({ type: z.literal("overview") }),
  ])
