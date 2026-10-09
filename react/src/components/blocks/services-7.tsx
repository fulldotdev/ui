import * as React from "react"
import { cn } from "cn"
import { ArrowRightIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Services7({
  badge,
  title,
  description,
  buttons,
  linkLabel,
  services,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
  description: string
  linkLabel: string
  buttons: {
    label: string
    href: string
  }[]
  services: {
    image?: {
      src: string
      srcSet?: string
      alt: string
      width?: number
      height?: number
    }
    label: string
    title: string
    description: string
    href?: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Badge variant="secondary">{badge}</Badge>
            <SectionTitle className="mt-4">{title}</SectionTitle>
            <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {buttons.map(({ href, label }, index) => (
              <a
                key={href + label}
                href={href}
                className={buttonVariants({
                  variant: index === 0 ? "default" : "outline",
                })}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => {
            const image = service.image ?? { ...placeholderImage, alt: "" }
            const className = cn(
              "group/service flex flex-col overflow-hidden rounded-xl border shadow-xs",
              service.href != null && "transition-shadow hover:shadow-md",
              index === 0 && "lg:col-span-2 lg:row-span-2"
            )
            const content = (
              <>
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={
                    index === 0
                      ? "(min-width: 80rem) 824px, (min-width: 64rem) 66vw, 100vw"
                      : "(min-width: 80rem) 400px, (min-width: 64rem) 33vw, 100vw"
                  }
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "w-full object-cover",
                    index === 0 ? "aspect-[16/9]" : "aspect-[16/10]"
                  )}
                />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <Badge variant="secondary" className="w-fit">
                    {service.label}
                  </Badge>
                  <h3
                    className={cn(
                      "font-medium",
                      index === 0 ? "text-xl" : "text-base"
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  {service.href != null && (
                    <div
                      className={cn(
                        "flex items-center gap-1.5 pt-2 text-sm font-medium text-primary",
                        index !== 0 && "mt-auto"
                      )}
                    >
                      {linkLabel}
                      <ArrowRightIcon className="size-3.5 transition-transform group-hover/service:translate-x-1" />
                    </div>
                  )}
                </div>
              </>
            )
            return service.href != null ? (
              <a
                key={service.href + service.title}
                href={service.href}
                className={className}
              >
                {content}
              </a>
            ) : (
              <div key={service.title} className={className}>
                {content}
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Services7 }
