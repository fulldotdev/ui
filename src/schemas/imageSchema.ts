import { z } from 'astro:content'

export const imageSchema = z
  .object({
    id: z.string(),
    src: z.string(),
    alt: z.string().default(''),
    width: z.number(),
    height: z.number(),
    format: z.string(),
  })
  .passthrough()

export type ImageSchema = z.infer<typeof imageSchema>

export const imageLoader = async () => {
  const files = import.meta.glob('/src/images/**/*.{webp,png,jpg,jpeg,svg}', {
    eager: true,
  })
  const entries = import.meta.glob('/src/images/**/*.{yml,yaml,json}', {
    eager: true,
  })

  const allImages = Object.entries(files).map(([src, file]) => {
    const id = src.split('/images/').pop()
    const matchPath = Object.keys(entries).find(
      (entry) => entry.split('.').shift() === src
    ) as any
    const matchFile = entries[matchPath]
    const matchData = matchFile ? (matchFile as any).default : {}
    const fileData = file ? (file as any).default : {}
    return {
      id,
      ...fileData,
      src,
      ...matchData,
    }
  })

  return allImages as any
}
