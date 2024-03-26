import { z } from 'zod'
import { entrySchema } from './entrySchema'

export type Entries = z.infer<typeof entriesSchema>

export const entriesSchema = z
  .array(entrySchema)
  .transform((val) => val.filter(Boolean))
