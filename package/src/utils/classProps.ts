import type { AstroGlobal } from 'astro'

export const classProps = ({
  compact,
  contrast,
  theme,
  variant,
  density,
  structure,
  size,
  align,
  position,
  frame,
  ratio,
}: AstroGlobal['props']) => ({
  compact,
  contrast,
  [`theme-${theme}`]: theme,
  [`variant-${variant}`]: variant,
  [`density-${density}`]: density,
  [`structure-${structure}`]: structure,
  [`size-${size}`]: size,
  [`align-${align}`]: align,
  [`position-${position}`]: position,
  [`frame-${frame}`]: frame,
  [`ratio-${ratio}`]: ratio,
})
