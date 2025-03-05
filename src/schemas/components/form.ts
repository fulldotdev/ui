import { z } from "astro:content"

export const formSchema = z
  .object({
    action: z.string(),
    fields: z
      .object({
        type: z.enum(["text", "email", "textarea", "date", "select"]),
        label: z.string(),
        placeholder: z.string(),
        options: z.string().array(),
        value: z.string(),
        required: z.boolean(),
      })
      .partial()
      .strict()
      .array(),
    submit: z.string(),
  })
  .partial()
  .strict()
