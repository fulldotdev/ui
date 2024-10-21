import { reference, z } from 'astro:content'

export default z.union([reference('images'), z.object({}).passthrough()]).pipe(
  z
    .object({
      id: z
        .string()
        .refine(async (data) => await reference('images').parseAsync(data)),
      src: z.string(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .partial()
    .passthrough()
)

// export default z.any()
