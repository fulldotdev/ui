import type { AstroGlobal } from 'astro'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { tagSchema } from '../components/Tag.astro'

export const parseProps = <
  S extends ReturnType<typeof buildProps>,
  P extends AstroGlobal['props'],
>(
  schema: S,
  props: P
) => {
  try {
    return schema.parse(props) as z.infer<S>
  } catch (err: any) {
    const stack = err.stack || ''
    const regexPattern = /(\w+\.astro):\d+:\d+/
    const match = stack.match(regexPattern)
    const location = match ? match[0] : 'Location not found'
    const message = fromZodError(err as z.ZodError).toString()
    throw new Error(`${location} > ${message}`)
  }
}

export const buildProps = <S extends z.ZodRawShape>(shape: S) =>
  tagSchema.extend(shape).partial()
