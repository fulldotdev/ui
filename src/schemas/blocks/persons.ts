import { pathSchema } from "@/schemas/misc/path"
import { z } from "astro:content"

export const personsSchema = z
  .object({
    align: z.enum(["start", "center", "end"]),
    content: z.string(),
    persons: pathSchema("persons").array(),
  })
  .partial()
  .strict()
