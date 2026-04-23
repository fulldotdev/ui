import { z } from "astro/zod"

export const docsLayoutSchema = z.looseObject({
  slug: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
})

export type DocsLayoutSchema = z.infer<typeof docsLayoutSchema>
