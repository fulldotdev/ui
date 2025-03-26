import { z } from "zod"

export const formSchema = z
  .object({
    action: z.string().optional(),
    fields: z
      .object({
        type: z
          .enum([
            "text",
            "email",
            "tel",
            "number",
            "checkbox",
            "select",
            "textarea",
          ])
          .optional(),
        name: z.string().optional(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        description: z.string().optional(),
        required: z.boolean().optional(),
        options: z.string().array().optional(),
      })
      .strict()
      .array()
      .optional(),
    submit: z.string().optional(),
  })
  .strict()
export type Form = z.infer<typeof formSchema>
