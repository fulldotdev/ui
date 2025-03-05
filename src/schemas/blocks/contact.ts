import { channelsSchema } from "@/schemas/components/channels"
import { formSchema } from "@/schemas/components/form"
import { z } from "astro:content"

export const contactSchema = z
  .object({
    align: z.enum(["start", "center", "end"]),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]),
    content: z.string(),
    channels: channelsSchema,
    form: formSchema,
  })
  .partial()
  .strict()
