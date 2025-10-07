import { getImage } from "astro:assets"
import { z } from "astro:schema"

import imageSchema from "@/schemas/elements/image"

type ImageSchema = z.infer<typeof imageSchema>

const IMAGES = import.meta.glob("src/assets/**/*.{webp,png,jpg,jpeg,gif,svg}")

export async function transformImage(image?: ImageSchema) {
  if (!image) return undefined
  if (!image.src)
    return {
      src: image.src,
      alt: image.alt,
      title: image.title,
    }

  const id = image.src?.split("/assets/").pop()
  const found = Object.keys(IMAGES).find((key) => key === `/src/assets/${id}`)

  if (!found) {
    console.warn(`Image not found: ${image.src}`)
    return {
      src: image.src,
      alt: image.alt,
      title: image.title,
    }
  }

  const file = ((await IMAGES[found as keyof typeof IMAGES]()) as any).default

  const generated = await getImage({
    src: file,
    format: "webp",
    widths: [320, 768, 1024, 1280, 1536, 1920],
    quality: "high",
  })

  return {
    src: generated.src,
    alt: image.alt,
    title: image.title,
    height: generated.options.height,
    width: generated.options.width,
    srcSet: generated.srcSet.attribute,
  }
}
