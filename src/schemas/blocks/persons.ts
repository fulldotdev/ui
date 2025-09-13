import { z } from "astro:schema"

import { personSchema } from "@/schemas/blocks/person"
import { linkSchema } from "@/schemas/fields/link"

export const personsSchema = z.object({
  size: z.enum(["sm", "default", "lg"]),
  align: z.enum(["start", "center", "end"]),
  html: z.string(),
  links: linkSchema.array(),
  persons: personSchema.array(),
})

export type PersonsProps = Omit<z.infer<typeof personsSchema>, "html"> & {
  children?: React.ReactNode
}
