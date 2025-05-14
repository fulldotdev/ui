import { z } from "zod"

import { linkSchema } from "@/schemas/fields/link"

export const menuSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
  links: linkSchema.array().optional(),
})
