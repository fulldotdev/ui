import { channelsSchema } from "@/schemas/components/channels"
import { formSchema } from "@/schemas/components/form"
import { z } from "astro:content"

export const contactSchema = z
  .object({
    variant: z.number().optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    content: z.string(),
    channels: channelsSchema,
    form: formSchema,
  })
  .partial()
  .strict()
