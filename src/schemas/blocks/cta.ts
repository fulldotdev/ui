import { z } from 'astro:content'
import buttons from '../components/buttons'
import heading from '../components/heading'
import tagline from '../components/tagline'
import text from '../components/text'
import image from '../fields/image'

export const ctaSchema = z
  .object({
    tagline: tagline,
    heading: heading,
    text: text,
    buttons: buttons,
    image: image,
  })
  .strict()

export type CtaSchema = z.infer<typeof ctaSchema>
