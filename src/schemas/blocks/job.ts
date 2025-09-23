import { z } from "astro:schema"

export const jobSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    title: z.string(),
    description: z.string(),
    published: z.date(),
    location: z.any(),
    salary: z.any(),
    hours: z.any(),
  })
  .partial()
  .strict()

export type JobSchema = z.infer<typeof jobSchema>
