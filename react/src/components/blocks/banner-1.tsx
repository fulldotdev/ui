import * as React from "react"
import { cn } from "cn"
import { ArrowRightIcon } from "lucide-react"

import { Banner, BannerContainer } from "@/components/ui/banner"

function Banner1({
  className,
  title,
  description,
  link,
  closeLabel,
  storageKey,
  ...props
}: React.ComponentProps<"aside"> & {
  title: string
  description: string
  link: {
    label: string
    href: string
  }
  closeLabel: string
  storageKey?: string
}) {
  return (
    <Banner
      storageKey={storageKey}
      className={cn("dark bg-background text-foreground", className)}
      {...props}
    >
      <BannerContainer
        className="flex-row items-center gap-x-4 gap-y-1"
        closeLabel={closeLabel}
      >
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">{title}</span>{" "}
          <span className="mx-1.5 hidden opacity-50 sm:inline">&middot;</span>{" "}
          <span className="opacity-80">{description}</span>
        </p>
        <a
          href={link.href}
          className="group/link inline-flex shrink-0 items-center gap-1 text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          {link.label}
          <ArrowRightIcon className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </a>
      </BannerContainer>
    </Banner>
  )
}

export { Banner1 }
