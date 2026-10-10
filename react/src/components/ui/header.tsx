import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const headerVariants = cva(
  "cn-header relative z-50 flex w-full items-center gap-4",
  {
    variants: {
      variant: {
        default: "",
        floating:
          "cn-header-variant-floating mx-auto w-[calc(100%-2*var(--gutter,--spacing(4)))] max-w-[calc(var(--container,var(--container-7xl))-2*var(--gutter,--spacing(4)))] overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Header({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"header"> & VariantProps<typeof headerVariants>) {
  return (
    <header
      data-slot="header"
      data-variant={variant}
      className={cn(headerVariants({ variant }), className)}
      {...props}
    />
  )
}

function HeaderContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="header-container"
      className={cn(
        "relative mx-auto flex w-full max-w-[var(--container,var(--container-7xl))] gap-4 px-[var(--gutter,--spacing(4))]",
        className
      )}
      {...props}
    />
  )
}

function HeaderGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="header-group"
      className={cn("flex min-w-0 items-center gap-2", className)}
      {...props}
    />
  )
}

export { Header, HeaderContainer, HeaderGroup, headerVariants }
