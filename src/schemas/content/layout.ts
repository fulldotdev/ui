import { bannerSchema } from "@/schemas/blocks/banner"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { z } from "zod"

export const layoutSchema = z
  .object({
    lang: z.string(),
    company: z.string(),
    banner: bannerSchema.optional(),
    header: headerSchema.optional(),
    footer: footerSchema.optional(),
    head: z.string().optional(),
    body: z.string().optional(),
    css: z.string().optional(),
  })
  .strict()

export type LayoutSchema = z.infer<typeof layoutSchema>
