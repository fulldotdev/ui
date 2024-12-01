import { z } from 'astro:content'
import image from 'fulldev-ui/schemas/components/image.ts'

export const avatarSchema = image

export type AvatarSchema = z.infer<typeof avatarSchema>
