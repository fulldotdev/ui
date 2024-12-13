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

const image = z
  .object({
    src: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  })
  .strict()

export const imageSchema = z
  .preprocess(
    (data: unknown) => (typeof data === 'string' ? { src: data } : data),
    image
  )
  .optional()

export type ImageSchema = z.infer<typeof image>
