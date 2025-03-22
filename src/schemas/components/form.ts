import { z } from "zod"

export const formSchema = z.object({
  action: z.string().optional(),
  fields: z
    .object({
      type: z
        .enum([
          "text",
          "number",
          "email",
          "checkbox",
          "select",
          "tel",
          "textarea",
        ])
        .optional(),
      name: z.string().optional(),
      label: z.string().optional(),
      placeholder: z.string().optional(),
      description: z.string().optional(),
      required: z.boolean().optional(),
      options: z.array(z.string()).optional(),
    })
    .array()
    .optional(),
  submit: z.string().optional(),
})

export type Form = z.infer<typeof formSchema>
