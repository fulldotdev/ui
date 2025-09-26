import { z } from "astro:schema"

import { bannerSchema } from "@/schemas/blocks/banner"
import { footerSchema } from "@/schemas/blocks/footer"
import { headerSchema } from "@/schemas/blocks/header"
import { pageSchema } from "@/schemas/page"
import { sectionSchema } from "@/schemas/section"

export const blockSchema = z.union([
  sectionSchema,
  pageSchema,
  headerSchema,
  bannerSchema,
  footerSchema,
])

export type BlockSchema = z.infer<typeof blockSchema>
