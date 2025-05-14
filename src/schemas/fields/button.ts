import { z } from "zod"

export const buttonSchema = z.object({
  text: z.string(),
  href: z.string(),
  variant: z
    .enum(["default", "outline", "secondary", "ghost", "link"])
    .optional(),
})
