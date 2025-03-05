import { buttonSchema } from "@/schemas/components/button"
import { pathSchema } from "@/schemas/misc/path"
import { z } from "zod"

export const collectionsSchema = z
  .object({
    size: z.enum(["xs", "sm", "default", "lg", "xl"]),
    align: z.enum(["start", "center", "end"]),
    content: z.string(),
    buttons: buttonSchema.array(),
    collections: pathSchema("collections").array(),
  })
  .partial()
  .strict()
