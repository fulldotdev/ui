import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/components/button.ts'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const featureSchema = z
  .object({
    _block: z.string(),
    tagline: z.string().optional(),
    heading: z.string().optional(),
    text: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    image: imageSchema.optional(),
  })
  .strict()

export type FeatureSchema = z.infer<typeof featureSchema>
