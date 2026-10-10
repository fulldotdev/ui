import * as React from "react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { Section, SectionContainer } from "@/components/ui/section"

function Hero12({
  className,
  title,
  description,
  buttons,
  image,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
  image: {
    src: string
    srcSet?: string
    alt: string
    width?: number
    height?: number
  }
}) {
  return (
    <Section className={cn("gap-8 pt-8", className)} {...props}>
      <SectionContainer className="flex flex-col gap-8 border-y py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-xl text-2xl leading-[1.2] font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-balance text-muted-foreground">
            {description}
          </p>
          <div className="flex flex-wrap gap-3">
            {buttons.map(({ href, label }, index) => (
              <a
                key={href + label}
                href={href}
                className={buttonVariants({
                  variant: index === 0 ? "default" : "secondary",
                })}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 80rem) 80rem, 100vw"
          loading="eager"
          fetchPriority="high"
          className="aspect-video w-full rounded-xl border object-cover"
        />
      </SectionContainer>
    </Section>
  )
}

export { Hero12 }
