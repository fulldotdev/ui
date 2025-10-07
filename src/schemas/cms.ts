import { z } from "astro:schema"

import page from "@/schemas/page"

export default z.object({
  sha: z.string().optional(),
  id: z.string(),
  filePath: z.string(),
  data: page,
  body: z.string().optional(),
  rendered: z
    .object({
      html: z.string(),
    })
    .optional(),
})
