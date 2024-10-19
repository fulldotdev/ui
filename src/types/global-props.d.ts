export type GlobalProps = {
  if?: any
  theme?: 'light' | 'dark' | string | null | undefined
  color?: 'base' | 'brand' | string | null | undefined
  size?: 'sm' | 'md' | 'lg' | string | number | null | undefined
  contrast?: boolean | undefined
}

// declare global {
//   type GlobalProps = {
//     theme?: 'light' | 'dark' | undefined
//     color?: 'base' | 'brand' | undefined
//     size?: 'sm' | 'md' | 'lg' | undefined
//     contrast?: boolean | undefined
//   }
// }
