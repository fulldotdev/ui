import { pathSchema } from "@/schemas/misc/path"
import { z } from "zod"

export const personsSchema = z
  .object({
    content: z.string(),
    persons: pathSchema("persons").array(),
  })
  .partial()
  .strict()
