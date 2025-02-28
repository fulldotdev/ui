import {
  SelectContent,
  SelectGroup,
  SelectItem,
  Select as SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ComponentProps } from 'react'

interface Props extends ComponentProps<typeof SelectRoot> {
  className?: string
  placeholder?: string
  options: {
    label: string
    value: string
  }[]
}

export function Select({ placeholder, options, className, ...props }: Props) {
  return (
    <SelectRoot {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  )
}
