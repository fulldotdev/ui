import { buttonSchema } from "@/schemas/components/button"
import { reference, z } from "astro:content"

import { pathSchema } from "../misc/path"

export const postsSchema = z
  .object({
    level: z.number().optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    posts: pathSchema.array().optional(),
  })
  .strict()
