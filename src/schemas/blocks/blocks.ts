import { z } from "astro:schema"

import { linksSchema } from "@/schemas/fields/links"
import { referencesSchema } from "@/schemas/fields/references"

export const blocksSchema = z
  .object({
    variant: z.enum(["1", "2"]),
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["sm", "default", "lg"]),
    html: z.string(),
    links: linksSchema,
    blocks: referencesSchema,
  })
  .partial()
  .strict()

export const blocksProps = blocksSchema

export type BlocksSchema = z.infer<typeof blocksSchema>
export type BlocksProps = z.infer<typeof blocksProps>
