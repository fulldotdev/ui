import { z } from "astro:content"

export const formSchema = z
  .object({
    action: z.string(),
    fields: z
      .object({
        type: z.enum(["text", "email", "textarea", "date", "select", "tel"]),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        options: z.string().array().optional(),
        value: z.string().optional(),
        required: z.boolean().optional(),
      })
      .partial()

      .array(),
    submit: z.string(),
  })
  .partial()
