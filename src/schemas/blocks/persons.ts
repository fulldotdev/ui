import { z } from "astro:schema"

import type { PersonProps } from "@/schemas/blocks/person"
import { linkSchema } from "@/schemas/fields/link"
import { pathSchema } from "@/schemas/fields/path"

export const personsSchema = z.object({
  variant: z.enum(["1"]),
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  links: linkSchema.array(),
  persons: pathSchema("persons").array(),
})

export type PersonsSchema = z.infer<typeof personsSchema>

export type PersonsProps = Omit<
  PersonsSchema,
  "variant" | "html" | "persons"
> & {
  children?: React.ReactNode
  persons?: PersonProps[]
}
