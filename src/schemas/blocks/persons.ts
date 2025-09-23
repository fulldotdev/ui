import { z } from "astro:schema"

import { personSchema } from "@/schemas/blocks/person"
import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const personsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linkSchema.array(),
    persons: pathSchema("persons").array(),
  })
  .partial()
  .strict()

export type PersonsSchema = z.infer<typeof personsSchema>
