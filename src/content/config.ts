import { defineCollection, z } from 'astro:content'
import page from 'fulldev-ui/schemas/page.ts'
import preset from 'fulldev-ui/schemas/preset.ts'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  presets: defineCollection({
    type: 'data',
    schema: preset,
  }),
  images: defineCollection({
    loader: async () => {
      const files = import.meta.glob(
        'src/images/**/*.{webp,png,jpg,jpeg,svg}',
        { eager: true }
      )
      const entries = import.meta.glob('src/images/**/*.{yml,yaml,json}', {
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
    },
    schema: z.object({
      id: z.string(),
      src: z.string(),
      alt: z.string().default(''),
      width: z.number(),
      height: z.number(),
      format: z.string(),
    }),
  }),
}
