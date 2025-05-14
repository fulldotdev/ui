import { z } from "zod"

export const formSchema = z
  .object({
    inbox: z.string().optional(),
    action: z.string().optional(),
    fields: z
      .object({
        type: z
          .enum([
            "text",
            "email",
            "tel",
            "date",
            "address",
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
        disabled: z
          .object({
            mon: z.boolean().optional(),
            tue: z.boolean().optional(),
            wed: z.boolean().optional(),
            thu: z.boolean().optional(),
            fri: z.boolean().optional(),
            sat: z.boolean().optional(),
            sun: z.boolean().optional(),
            future: z.boolean().optional(),
            past: z.boolean().optional(),
            today: z.boolean().optional(),
            dates: z.string().array().optional(),
          })
          .optional(),
      })
      .strict()
      .array()
      .optional(),
    submit: z.string().optional(),
  })
  .strict()

export type Form = z.infer<typeof formSchema>
