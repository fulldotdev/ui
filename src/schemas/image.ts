import { z } from 'astro:content'

// const imagePath = z.preprocess((data: unknown) => {
//   if (typeof data === 'string') {
//     return data.split('/').pop()
//   }
//   return data
// }, reference('images'))

// export const imageSchema = z
//   .union([imagePath, z.object({}).passthrough()])
//   .pipe(
//     z
//       .object({
//         id: z
//           .string()
//           .refine(async (data) => await reference('images').parseAsync(data)),
//         src: z.string(),
//         alt: z.string(),
//         width: z.number(),
//         height: z.number(),
//       })
//       .partial()
//       .passthrough()
//   )
//   .optional()

// export const imageSchema = z
//   .object({
//     src: z.string().optional(),
//     alt: z.string().optional(),
//     width: z.number().optional(),
//     height: z.number().optional(),
//   })
//   .strict() satisfies z.ZodType<ComponentProps<typeof Image>>

const image = z
  .object({
    src: z.string().optional(),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })
  .strict()

export const imageSchema = z.preprocess(
  (data: unknown) => (typeof data === 'string' ? { src: data } : data),
  image
)
