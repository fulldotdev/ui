import { z } from "astro:schema"

export const formSchema = z
  .object({
    inbox: z.string(),
    action: z.string(),
    fields: z.any(),
    submit: z.string(),
  })
  .partial()
  .strict()
