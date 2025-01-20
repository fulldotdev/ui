import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { fieldSchema } from 'fulldev-ui/schemas/field.ts'

export const formSchema = z
  .object({
    action: z.string().optional(),
    fields: z.array(fieldSchema).optional(),
    button: buttonSchema.optional(),
  })
  .strict()
