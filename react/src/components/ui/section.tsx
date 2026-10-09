import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const sectionVariants = cva("cn-section relative flex scroll-mt-12 flex-col", {
  variants: {
    variant: {
      default: "w-full bg-background",
      floating:
        "cn-section-variant-floating mx-auto w-[calc(100%-2*var(--gutter,--spacing(4)))] max-w-[calc(var(--container,var(--container-7xl))-2*var(--gutter,--spacing(4)))] overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Section({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      data-slot="section"
      data-variant={variant}
      className={cn(sectionVariants({ variant }), className)}
      {...props}
    />
  )
}

function SectionContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="section-container"
      className={cn(
        "relative mx-auto w-full max-w-[var(--container,var(--container-7xl))] px-[var(--gutter,--spacing(4))]",
        className
      )}
      {...props}
    />
  )
}

function SectionTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h2">) {
  return useRender({
    defaultTagName: "h2",
    props: mergeProps<"h2">(
      {
        className: cn(
          "cn-section-title font-heading text-balance text-foreground",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "section-title",
    },
  })
}

function SectionDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-description"
      className={cn(
        "cn-section-description text-balance text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
  sectionVariants,
}
