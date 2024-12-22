import type { ComponentProps } from 'astro/types'
import { z } from 'astro:content'
import type Proof from 'fulldev-ui/components/Proof.astro'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const proofSchema = z
  .object({
    rating: z.number().optional(),
    avatars: imageSchema.array().optional(),
    text: z.string().optional(),
  })
  .strict() satisfies z.ZodType<ComponentProps<typeof Proof>>
