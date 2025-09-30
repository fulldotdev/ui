import { z } from "astro:schema"

import { linksSchema } from "@/schemas/fields/links"
import { referencesSchema } from "@/schemas/fields/references"

export const jobsSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    size: z.enum(["sm", "default", "lg"]),
    align: z.enum(["start", "center", "end"]),
    html: z.string(),
    links: linksSchema,
    jobs: referencesSchema,
  })
  .partial()
  .strict()

export const jobsProps = jobsSchema

export type JobsSchema = z.infer<typeof jobsSchema>
export type JobsProps = z.infer<typeof jobsProps>
