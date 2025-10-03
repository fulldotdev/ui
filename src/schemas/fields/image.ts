// import { getImage } from "astro:assets"
import { z } from "astro:schema"

// const IMAGES = import.meta.glob("src/assets/**/*.{webp,png,jpg,jpeg,gif,svg}")

// export const imageSchema = z.preprocess(
//   async (image) => {
//     if (typeof image !== "object" || image === null) return
//     if (!("src" in image)) return
//     if (typeof image.src !== "string") return

//     const id = image.src?.split("/assets/").pop()
//     const found = Object.keys(IMAGES).find((key) => key === `/src/assets/${id}`)

//     if (!found) {
//       console.warn(`Image not found: ${image.src}`)
//       return
//     }

//     const file = ((await IMAGES[found as keyof typeof IMAGES]()) as any).default

//     if (import.meta.env.DEV) {
//       const merged = {
//         ...image,
//         ...file,
//       }
//       return merged
//     }

//     // return image
//     const generated = await getImage({
//       src: file,
//       format: "webp",
//       widths: [320, 768, 1024, 1280, 1536, 1920],
//       quality: "mid",
//       sizes: "100vw",
//     })

//     return {
//       sizes: "100vw",
//       loading: "lazy",
//       decoding: "async",
//       fetchpriority: "auto",
//       ...image,
//       height: generated.attributes.height,
//       width: generated.attributes.width,
//       src: generated.src,
//       srcset: generated.srcSet.attribute,
//     }
//   },
//   z.object({
//     src: z.string(),
//     alt: z.string(),
//     title: z.string(),
//   })
// )

export const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    title: z.string(),
  })
  .partial()
  .strict()

export type ImageSchema = z.infer<typeof imageSchema>
// export const imageSchema = z
//   .object({
//     src: z.string(),
//     alt: z.string(),
//     title: z.string(),
//   })
//   .transform(async (image) => {
//     const id = image.src?.split("/assets/").pop()
//     const found = Object.keys(IMAGES).find((key) => key === `/src/assets/${id}`)

//     if (!found) {
//       console.warn(`Image not found: ${image.src}`)
//       return
//     }

//     const file = ((await IMAGES[found as keyof typeof IMAGES]()) as any).default

//     if (import.meta.env.DEV) {
//       const merged = {
//         ...image,
//         ...file,
//       }
//       return merged
//     }

//     // return image
//     const generated = await getImage({
//       src: file,
//       format: "webp",
//       widths: [320, 768, 1024, 1280, 1536, 1920],
//       quality: "mid",
//       sizes: "100vw",
//     })

//     return {
//       sizes: "100vw",
//       loading: "lazy",
//       decoding: "async",
//       fetchpriority: "auto",
//       ...image,
//       height: generated.attributes.height,
//       width: generated.attributes.width,
//       src: generated.src,
//       srcset: generated.srcSet.attribute,
//     }
//   })
//   .pipe(
//     z.object({
//       src: z.string(),
//       alt: z.string(),
//       title: z.string(),
//       height: z.number(),
//       width: z.number(),
//       srcset: z.string(),
//     })
//   )
