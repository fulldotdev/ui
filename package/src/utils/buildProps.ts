import type { AstroGlobal } from 'astro'
import merge from 'deepmerge'

export type BuildProps<
  Name extends string,
  Props extends AstroGlobal['props'],
> = Omit<Props, Name> & {
  [Key in Name]: Name extends keyof Props
    ? Props | Props[Name] | null
    : Props | null
} & {
  [Key in `_${Name}`]: Name extends keyof Props
    ? Props | Props[Name] | null
    : Props | null
}

export const buildProps = <
  Name extends string,
  Props extends BuildProps<Name, AstroGlobal['props']>,
>(
  name: Name,
  Astro: { props: Props }
) => {
  const _name = `_${name}` as `_${Name}`
  const { [name]: value, [_name]: _value, ...stripped } = Astro.props

  const toObject = (val: Props[Name] | Props[`_${Name}`]) =>
    typeof val === 'object' &&
    val !== null &&
    !Array.isArray(val) &&
    name in val
      ? (val as Extract<Props[Name], object>)
      : ({ [name]: val } as Extract<Props[Name], object>)

  const object = toObject(value)
  const _object = toObject(_value)

  const merged = merge(
    stripped as Partial<Props>,
    merge(_object, object) as Partial<Props>
  )

  return merged as Omit<Props, Name | `_${Name}`> & Extract<Props[Name], object>

  // This DOES create the right types, but not deep merge :(
  // const merged = {
  //   ...stripped,
  //   ..._object,
  //   ...object,
  // }
}
