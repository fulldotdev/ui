import { z } from "zod"

export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

export type SeoSchema = z.infer<typeof seoSchema>
