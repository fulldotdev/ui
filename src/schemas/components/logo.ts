import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/components/image.ts'

export const logoSchema = imageSchema

export type LogoSchema = z.infer<typeof logoSchema>
