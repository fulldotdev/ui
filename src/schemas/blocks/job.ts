import { z } from "astro:schema"

import { imageSchema } from "@/schemas/fields/image"

export const jobSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    image: imageSchema,
    published: z.date(),
    location: z.any(),
    salary: z.any(),
    hours: z.any(),
  })
  .partial()
  .strict()

export const jobProps = jobSchema

export type JobSchema = z.infer<typeof jobSchema>
export type JobProps = z.infer<typeof jobProps>
