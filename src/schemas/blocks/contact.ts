import { channelsSchema } from "@/schemas/components/channels"
import { formSchema } from "@/schemas/components/form"
import { z } from "astro:content"

export const contactSchema = z
  .object({
    level: z.number().optional(),
    size: z.enum(["xs", "sm", "default", "lg", "xl", "2xl"]).optional(),
    align: z.enum(["start", "center", "end"]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    channels: channelsSchema.optional(),
    form: formSchema.optional(),
  })
  .strict()
