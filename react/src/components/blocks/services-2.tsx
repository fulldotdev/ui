import * as React from "react"
import { cn } from "cn"

import { placeholderImage } from "@/lib/placeholder-image"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Services2({
  badge,
  title,
  description,
  services,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
  description: string
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
    button: {
      label: string
      href: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-12">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">{badge}</Badge>
          <SectionTitle className="mt-4">{title}</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-6 lg:gap-8">
          {services.map((service) => {
            const image = service.image ?? { ...placeholderImage, alt: "" }
            return (
              <div
                key={service.title}
                className="grid items-center gap-6 rounded-xl border p-4 shadow-xs md:grid-cols-[16rem_minmax(0,1fr)] md:p-0"
              >
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 768px) 16rem, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-lg object-cover md:aspect-auto md:h-full md:rounded-l-xl md:rounded-r-none"
                />
                <div className="flex flex-col gap-2 py-2 md:py-6 md:pr-6">
                  <span className="text-xs font-medium tracking-wider text-primary uppercase">
                    {service.label}
                  </span>
                  <h3 className="text-lg font-medium">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <a
                    href={service.button.href}
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "mt-1 w-fit"
                    )}
                  >
                    {service.button.label}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Services2 }
