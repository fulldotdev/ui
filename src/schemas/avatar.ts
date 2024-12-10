import { z } from 'astro:content'
import { imageSchema } from 'fulldev-ui/schemas/image.ts'

export const avatarSchema = imageSchema

export type AvatarSchema = z.infer<typeof avatarSchema>
