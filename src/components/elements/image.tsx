import { cn } from "@/lib/utils"

interface Props {
  src?: string
  alt?: string
  width?: number
  height?: number
  sizes?: string
  loading?: "eager" | "lazy"
  decoding?: "async" | "auto" | "sync"
  fetchpriority?: string
  className?: string
}

export default function ({ className, ...props }: Props) {
  if (!props.src) return null
  return <img className={cn(className)} {...props} />
}
