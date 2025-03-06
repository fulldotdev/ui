import { buttonSchema } from "@/schemas/components/button"
import { pathSchema } from "@/schemas/misc/path"
import { z } from "astro:content"

export const collectionsSchema = z
  .object({
    level: z.number().optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    collections: pathSchema.array().optional(),
  })
  .strict()
