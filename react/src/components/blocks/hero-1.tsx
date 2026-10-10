import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionDescription,
} from "@/components/ui/section"

function Hero1({
  title,
  description,
  badge,
  buttons,
  image,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  badge?: {
    label: string
    href: string
  }
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
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        {badge && (
          <Badge render={<a href={badge.href} />} variant="secondary">
            {badge.label}
          </Badge>
        )}
        <h1 className="max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <SectionDescription className="max-w-2xl">
          {description}
        </SectionDescription>
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

export { Hero1 }
