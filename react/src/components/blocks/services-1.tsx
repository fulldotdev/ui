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

function Services1({
  badge,
  title,
  buttons,
  services,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
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
          </div>
          <div className="flex flex-wrap gap-3">
            {buttons.map(({ href, label }) => (
              <a
                key={href + label}
                href={href}
                className={buttonVariants({ variant: "outline" })}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const image = service.image ?? { ...placeholderImage, alt: "" }
            const className = cn(
              "group/service flex flex-col gap-4 overflow-hidden rounded-xl border shadow-xs",
              service.href != null && "transition-shadow hover:shadow-md"
            )
            const content = (
              <>
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 80rem) 294px, (min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
                  <span className="text-xs font-medium text-primary">
                    {service.label}
                  </span>
                  <h3 className="text-base font-medium">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  {service.href != null && (
                    <span className="mt-auto pt-2">
                      <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover/service:translate-x-1" />
                    </span>
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

export { Services1 }
