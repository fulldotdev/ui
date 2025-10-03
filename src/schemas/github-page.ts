import { z } from "astro:schema"

import { pageSchema } from "@/schemas/page"

export const githubPageSchema = z.object({
  sha: z.string().optional(),
  id: z.string(),
  filePath: z.string(),
  data: pageSchema,
  body: z.string().optional(),
  rendered: z
    .object({
      html: z.string(),
    })
    .optional(),
})

export type GithubPageSchema = z.infer<typeof githubPageSchema>
