import type { AstroGlobal } from 'astro'
import { z } from 'astro:content'
import { merge } from 'merge-anything'
import { endomorphic } from './endomorphic'

const toObject = (name: string, value: any) => {
  if (!value) return {}
  if (typeof value === 'object' && !Array.isArray(value)) return value
  return { [name]: value }
}

export const ectomorphic = <
  N extends keyof P,
  S extends ReturnType<typeof endomorphic<N, z.ZodObject<any, any, any>>>,
  P extends AstroGlobal['props'],
>(
  name: N & string,
  schema: S,
  props: P
) =>
  schema
    .transform((val) => {
      const stripped = { ...val }
      delete stripped[name]
      delete stripped[`_${name}`]

      console.log('1', val[`_${name}`])
      console.log('2', val[name])
      console.log('3', toObject(name, val[`_${name}`]))
      console.log('4', toObject(name, val[name]))
      console.log('5', stripped)

      const merged = merge(
        toObject(name, val[`_${name}`]),
        toObject(name, val[name]),
        stripped
      )
      console.log('6', merged)
    })
    .parse(props) as Omit<P, N | `_${N & string}`> &
    Extract<P[N], object & { length?: never }>
