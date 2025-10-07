import { cn } from "@/lib/utils"

export default function ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-4 md:px-8 lg:px-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
