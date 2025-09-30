import { z } from "astro:schema"

import { personProps } from "@/schemas/blocks/person"
import { linksSchema } from "@/schemas/fields/links"
import { referencesProps, referencesSchema } from "@/schemas/fields/references"

export const personsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linksSchema,
    persons: referencesSchema,
  })
  .partial()
  .strict()

export const personsProps = personsSchema.extend({
  persons: referencesProps.pipe(personProps.array()),
})

export type PersonsSchema = z.infer<typeof personsSchema>
export type PersonsProps = z.infer<typeof personsProps>
