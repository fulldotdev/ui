import * as React from "react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import { Section, SectionContainer } from "@/components/ui/section"

function Hero3({
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
    width?: number
    height?: number
  }
}) {
  return (
    <Section
      className={cn(
        "dark min-h-[80vh] justify-center bg-background",
        className
      )}
      {...props}
    >
      <SectionContainer className="relative z-10 flex flex-col items-center gap-8 text-center">
        <h1 className="max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-balance text-foreground/80">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {buttons.map(({ href, label }, index) => (
            <a
              key={href + label}
              href={href}
              className={buttonVariants({
                size: "lg",
                variant: index === 0 ? "default" : "secondary",
              })}
            >
              {label}
            </a>
          ))}
        </div>
      </SectionContainer>
      <div className="pointer-events-none absolute inset-0 bg-background">
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt=""
          width={image.width}
          height={image.height}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="size-full object-cover opacity-50"
        />
      </div>
    </Section>
  )
}

export { Hero3 }
