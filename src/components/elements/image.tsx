import { cn } from "@/lib/utils"

interface Props {
  src?: string
  alt?: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  srcSet?: string
  title?: string
  loading?: "eager" | "lazy"
  decoding?: "async" | "auto" | "sync"
  fetchPriority?: "auto" | "high" | "low"
}

export default function ({
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  className,
  ...props
}: Props) {
  if (!props.src) return null
  return (
    <img
      className={cn(className)}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...props}
    />
  )
}
