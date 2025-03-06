import { buttonSchema } from "@/schemas/components/button"
import { pathSchema } from "@/schemas/misc/path"
import { z } from "astro:content"

export const collectionsSchema = z
  .object({
    variant: z.number().optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl"]).optional(),
    content: z.string(),
    buttons: buttonSchema.array(),
    collections: pathSchema("collections").array(),
  })
  .partial()
  .strict()
