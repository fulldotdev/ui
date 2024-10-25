import { reference, z } from 'astro:content'

export const imageSchema = z
  .union([reference('images'), z.object({}).passthrough()])
  .pipe(
    z
      .object({
        id: z
          .string()
          .refine(async (data) => await reference('images').parseAsync(data)),
        src: z.any(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
        position: z.enum(['background', 'cover', 'inset']),
      })
      .partial()
      .passthrough()
  )

export type ImageSchema = z.infer<typeof imageSchema>

export default imageSchema
