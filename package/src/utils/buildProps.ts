import type { AstroGlobal } from 'astro'
import merge from 'deepmerge'

export type BuildProps<
  Name extends string,
  Props extends AstroGlobal['props'],
  Value extends AstroGlobal['props'][Name] = undefined | null,
> = {
  [Key in Name | `_${Name}`]?:
    | Value
    | (Omit<Props, Name> & {
        [K in Name]: Value
      })
    | null
}

export const buildProps = <
  Name extends string,
  Props extends BuildProps<
    Name,
    AstroGlobal['props'],
    AstroGlobal['props'][Name]
  >,
>(
  name: Name,
  props: Props
) => {
  const _name = `_${name}` as `_${Name}`
  const { [name]: value, [_name]: _value, ...stripped } = props

  type Object = object & { length?: never; card?: any }
  const toObject = (val: Props[Name] | Props[`_${Name}`]) =>
    typeof val === 'object' &&
    val !== null &&
    !Array.isArray(val) &&
    name in val
      ? (val as Extract<Props[Name], Object>)
      : ({ [name]: val } as Extract<Props[Name], Object>)

  const object = toObject(value)
  const _object = toObject(_value)

  const merged = merge(
    stripped as Partial<Props>,
    merge(_object, object) as Partial<Props>
  )

  return merged as Omit<Props, Name | `_${Name}`> & Extract<Props[Name], Object>

  // Below DOES create the right types, but not deep merge :(
  // const merged = {
  //   ...stripped,
  //   ..._object,
  //   ...object,
  // }

  // below is the OG way, in case the above breaks
  // return merged as Omit<Props, Name | `_${Name}`> & {
  //   [Key in Name]?: Exclude<Props[Name], object & { length?: never }>
  // }
}
