import type { ImageMetadata } from "astro"

export function resolveAssetSrc(src: ImageMetadata | string) {
  return typeof src === "string" ? src : src
}
