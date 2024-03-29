import type { ZodRawShape } from 'zod'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const zodObjectwithReadableError = <S extends ZodRawShape>(shape: S) => {
  const schema = z.object(shape)
  const defaultParseFunction = schema.parse
  schema.parse = (data: unknown) => {
    try {
      return defaultParseFunction(data)
    } catch (err: any) {
      const stack = err.stack || ''
      const inComponent = stack.match(/(\w+\.astro):\d+:\d+/)?.[0]
      const message = fromZodError(err).toString()
      throw new Error(`${inComponent ?? 'Component props'} > ${message}`)
    }
  }
  return schema
}
