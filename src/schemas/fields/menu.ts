import { linkSchema } from "@/schemas/fields/link"
import { z } from "zod"

export const menuSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    links: z.array(linkSchema).optional(),
  })
  .strict()

export type MenuSchema = z.infer<typeof menuSchema>
