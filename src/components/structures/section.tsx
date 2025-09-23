import { cn } from "@/lib/utils"

export default function ({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      {children}
    </section>
  )
}
