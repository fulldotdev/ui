// import { getImage as getImageAstro } from "astro:assets"
// import { getCollection, getEntry, z, type CollectionEntry } from "astro:content"
// import { title } from "radash"

// import type {
//   globSchema,
//   imageSchema,
//   pageSchema,
//   pathSchema,
// } from "@/lib/schemas"

// export async function getData<T extends CollectionEntry<"pages">>(
//   page: T
// ): Promise<z.infer<typeof pageSchema>> {
//   const indexLayout = await getEntry("layouts", "index")
//   const matchingLayouts = await getCollection("layouts", (layout) =>
//     page.id.startsWith(layout.id)
//   )

//   let href: string | undefined = undefined
//   if ((page.body || page.data.blocks || page.data.block) && !page.data.draft) {
//     if (page.id === "index") href = "/"
//     else href = `/${page.id}/`
//   }

//   return {
//     href,
//     ...indexLayout?.data,
//     ...matchingLayouts.map((layout) => layout.data),
//     ...page.data,
//   }
// }

// export async function getPath(path: z.infer<typeof pathSchema>) {
//   const slug = path.replace("/src/content/pages/", "").split(".")[0]
//   const id = slug.replace("/index", "")
//   const page = await getEntry("pages", id)

//   if (!page) throw new Error(`Page not found: ${path}`)

//   const data = await getData(page)
//   return data
// }

// export async function getGlob(glob: z.infer<typeof globSchema>) {
//   const collection = await getCollection("pages")
//   const entries = collection.filter((page) => page.id.startsWith(glob))

//   return await Promise.all(
//     entries.map(async (entry) => {
//       if (!entry) throw new Error(`Page not found: ${glob}`)
//       const data = await getData(entry)
//       return data
//     })
//   )
// }

// export async function getImage(image: z.infer<typeof imageSchema>) {
//   const IMAGES = import.meta.glob("src/assets/**/*.{png,jpg,jpeg,gif,svg}")

//   const imageObject =
//     typeof image === "string"
//       ? {
//           src: image,
//           alt: title(image.split(".")[0].split("/").pop() || ""),
//         }
//       : image

//   const found = Object.keys(IMAGES).find((key) => key.endsWith(imageObject.src))
//   if (!found) return imageObject

//   const file = ((await IMAGES[found as keyof typeof IMAGES]()) as any).default

//   if (import.meta.env.DEV) {
//     return {
//       ...imageObject,
//       ...file,
//     }
//   }

//   const generated = await getImageAstro({
//     src: file,
//     format: "webp",
//     widths: [320, 768, 1024, 1280, 1536, 1920],
//     quality: "mid",
//     sizes: "100vw",
//   })

//   return {
//     sizes: "100vw",
//     loading: "lazy",
//     decoding: "async",
//     fetchpriority: "auto",
//     ...imageObject,
//     height: generated.attributes.height,
//     width: generated.attributes.width,
//     src: generated.src,
//     srcset: generated.srcSet.attribute,
//   }
// }
