import * as React from "react"
import { cn } from "cn"

import { Banner, BannerContainer } from "@/components/ui/banner"
import { buttonVariants } from "@/components/ui/button"

function Banner2({
  className,
  title,
  description,
  buttons,
  ...props
}: React.ComponentProps<"aside"> & {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
}) {
  return (
    <Banner
      variant="floating"
      className={cn("@container", className)}
      {...props}
    >
      <BannerContainer
        className="flex-col items-start gap-4 py-1 @2xl:flex-row @2xl:items-center"
        showClose={false}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 @5xl:flex-row @5xl:items-center @5xl:gap-x-4">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {buttons.map(({ href, label }, index) => (
            <a
              key={href + label}
              href={href}
              className={buttonVariants({
                size: "sm",
                variant: index === 0 ? "default" : "outline",
              })}
            >
              {label}
            </a>
          ))}
        </div>
      </BannerContainer>
    </Banner>
  )
}

export { Banner2 }
