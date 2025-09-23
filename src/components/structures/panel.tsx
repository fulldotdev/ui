import { cn } from "@/lib/utils"

export default function ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border px-4 py-16 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
