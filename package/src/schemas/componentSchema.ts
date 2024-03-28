import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { tagSchema } from '../components/Tag.astro'

export const componentSchema = <S extends z.ZodRawShape>(shape: S) => {
  const schema = tagSchema.extend(shape).partial()
  return schema
  const parse = schema.parse
  schema.parse = (data: unknown) => {
    try {
      return parse(data)
    } catch (err: any) {
      const stack = err.stack || ''
      const regexPattern = /(\w+\.astro):\d+:\d+/
      const match = stack.match(regexPattern)
      const location = match ? match[0] : 'Component Props'
      const message = fromZodError(err as z.ZodError).toString()
      throw new Error(`${location} > ${message}`)
    }
  }
  return schema
}
