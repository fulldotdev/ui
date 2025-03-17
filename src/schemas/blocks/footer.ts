import { z } from "zod"

export const footerSchema = z
  .object({
    logo: z.any().optional(),
    description: z.string().optional(),
    socials: z.any().optional(),
    channels: z.any().optional(),
    hours: z.record(z.string()).optional(),
    menus: z.array(z.any()).optional(),
  })
  .passthrough()

export type FooterProps = z.infer<typeof footerSchema>
