import { clsx, type ClassValue } from 'clsx'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasChildren(children: React.ReactNode) {
  const hasChildren = React.Children.count(children) > 0

  // Check for html childrem, which get passed in Astro
  const childrenProps =
    children && typeof children === 'object' && 'props' in children ? (children.props as object) : undefined
  const childrenValue = childrenProps && 'value' in childrenProps ? String(childrenProps.value).trim() : undefined
  const hasChildrenHtml = childrenValue && childrenValue.length > 0 ? true : false

  return (hasChildren && childrenValue === undefined) || hasChildrenHtml
}
