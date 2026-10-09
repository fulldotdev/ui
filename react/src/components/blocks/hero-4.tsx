import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Section, SectionContainer } from "@/components/ui/section"

function Hero4({
  className,
  title,
  description,
  features,
  buttons,
  image,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  features: string[]
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
        "dark min-h-screen justify-center bg-background text-foreground",
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
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
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

export { Hero4 }
