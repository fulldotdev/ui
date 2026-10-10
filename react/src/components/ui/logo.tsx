import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

function Logo({ className, render, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    // A logo with a destination is a link, otherwise a plain container.
    defaultTagName: props.href == null ? "div" : "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "cn-logo flex h-10 items-center justify-start gap-2 whitespace-nowrap",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "logo",
    },
  })
}

function LogoImage({
  className,
  src,
  srcLight,
  srcDark,
  alt = "",
  ...props
}: React.ComponentProps<"img"> & {
  srcLight?: string
  srcDark?: string
}) {
  const classes = "h-6 w-auto shrink-0 object-contain"
  if (srcLight && srcDark) {
    return (
      <>
        <img
          data-slot="logo-image"
          src={srcLight}
          alt={alt}
          className={cn(classes, "dark:hidden", className)}
          {...props}
        />
        <img
          data-slot="logo-image"
          src={srcDark}
          alt={alt}
          className={cn(classes, "hidden dark:block", className)}
          {...props}
        />
      </>
    )
  }
  if (!src) return null
  return (
    <img
      data-slot="logo-image"
      src={src}
      alt={alt}
      className={cn(classes, className)}
      {...props}
    />
  )
}

function LogoText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="logo-text"
      className={cn("text-lg", className)}
      {...props}
    />
  )
}

export { Logo, LogoImage, LogoText }
