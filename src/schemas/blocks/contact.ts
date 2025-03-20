import { buttonSchema } from "@/schemas/components/button"
import { channelsSchema } from "@/schemas/components/channels"
import { z } from "zod"

export const contactSchema = z
  .object({
    level: z.number().min(1).max(3).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttons: buttonSchema.array().optional(),
    channels: channelsSchema.optional(),
    form: z
      .object({
        action: z.string().optional(),
        fields: z
          .array(
            z.object({
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
          )
          .optional(),
        submit: z.string().optional(),
      })
      .optional(),
  })
  .passthrough()

export type ContactProps = z.infer<typeof contactSchema>
