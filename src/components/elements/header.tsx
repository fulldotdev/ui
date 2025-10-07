import { cn } from "@/lib/utils"

interface Props {
  className?: string
  id?: string
  children?: React.ReactNode
}

export default function ({ className, id, children, ...props }: Props) {
  return (
    <header
      className={cn(
        "bg-background sticky top-0 z-50 flex items-center py-3",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}
