import { z } from "astro:schema"

export default z
  .object({
    action: z.string(),
    fields: z.array(
      z
        .object({
          name: z.string(),
          type: z.string(),
          label: z.string(),
          placeholder: z.string(),
          required: z.boolean(),
        })
        .partial()
        .strict()
    ),
    submit: z.string(),
  })
  .partial()
  .strict()
