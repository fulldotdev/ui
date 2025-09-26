import { z } from "astro:schema"

export const formSchema = z
  .object({
    inbox: z.string(),
    action: z.string(),
    submit: z.string(),
    fields: z
      .object({
        type: z.enum([
          "text",
          "email",
          "tel",
          "number",
          "textarea",
          "select",
          "radio",
          "checkbox",
          "choice",
          "multichoice",
          "slider",
          "date",
        ]),
        name: z.string(),
        label: z.string(),
        required: z.boolean(),
        placeholder: z.string(),
        options: z.string().array(),
      })
      .partial()
      .strict()
      .array(),
  })
  .partial()
  .strict()
