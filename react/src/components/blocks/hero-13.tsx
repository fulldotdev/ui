import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
import { Section, SectionContainer } from "@/components/ui/section"

function Hero13({
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
    <Section {...props}>
      <SectionContainer className="grid gap-12 lg:grid-cols-[1fr_3fr] lg:items-start">
        <div className="flex flex-col gap-6 pt-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl leading-[1.2] font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
              {title}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
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
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 80rem) 900px, (min-width: 64rem) 75vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="aspect-[4/3] w-full rounded-xl border object-cover"
        />
      </SectionContainer>
    </Section>
  )
}

export { Hero13 }
