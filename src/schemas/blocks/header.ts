import { buttonSchema } from "@/schemas/components/button"
import { z } from "zod"

export const headerSchema = z
  .object({
    logo: z.any().optional(),
    menus: z.any().optional(),
    buttons: buttonSchema.array().optional(),
    search: z.union([z.boolean(), z.any()]).optional(),
    cart: z.boolean().optional(),
  })
  .passthrough()

export type HeaderProps = z.infer<typeof headerSchema>
