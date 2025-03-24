import { z } from "zod"

export const buttonSchema = z
  .object({
    text: z.string().optional(),
    href: z.string().optional(),
    variant: z
      .enum(["default", "outline", "secondary", "ghost", "link"])
      .optional(),
  })
  .strict()

export type ButtonSchema = z.infer<typeof buttonSchema>
