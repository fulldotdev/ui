import type { ZodRawShape } from 'zod'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { elementsSchema } from './elementsSchema'

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

export const componentSchema = <S extends z.ZodRawShape>(shape: S = {} as S) =>
  zodObjectwithReadableError({
    as: elementsSchema,
    if: z.union([z.string(), z.literal(true)]),
    id: z.string(),
    class: z.string(),
    style: z.string(),
    color: z.string(),
    scheme: z.string(),
    contrast: z.boolean(),
    compact: z.boolean(),
    order: z.string().or(z.number()),
    size: z
      .enum(['1', '2', '3', '4'])
      .or(z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])),
    ...shape,
  })
    .partial()
    .catchall(z.any())

export const propsSchema = <S extends z.ZodRawShape>(shape: S = {} as S) => {
  const schema = z.object(shape).partial()
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
