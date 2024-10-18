import { defineCollection } from 'astro:content'
import image from 'fulldev-ui/schemas/image.ts'
import page from 'fulldev-ui/schemas/page.ts'
import preset from 'fulldev-ui/schemas/preset.ts'
import record from 'fulldev-ui/schemas/record.ts'

export const collections = {
  pages: defineCollection({
    type: 'content',
    schema: page,
  }),
  records: defineCollection({
    type: 'data',
    schema: record,
  }),
  presets: defineCollection({
    type: 'data',
    schema: preset,
  }),
  images: defineCollection({
    type: 'data',
    schema: image,
  }),
}
