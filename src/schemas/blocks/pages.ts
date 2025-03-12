import { buttonSchema } from "@/schemas/components/button"
import { pathSchema } from "@/schemas/misc/path"
import { z } from "astro:content"

export const pagesSchema = z
  .object({
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    button: buttonSchema.optional(),
    pages: pathSchema("pages").array().optional(),
  })
  .strict()
