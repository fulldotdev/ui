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

function Services3({
  badge,
  title,
  description,
  buttons,
  services,
  ...props
}: React.ComponentProps<"section"> & {
  badge: string
  title: string
  description: string
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
      <SectionContainer className="flex flex-col gap-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary">{badge}</Badge>
          <SectionTitle className="mt-4">{title}</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
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
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const image = service.image ?? { ...placeholderImage, alt: "" }
            return (
              <div
                key={service.title}
                className="relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl"
              >
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 80rem) 612px, (min-width: 40rem) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 size-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="flex flex-col gap-2 p-6 text-white">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">
                    {service.description}
                  </p>
                  <a
                    href={service.button.href}
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "mt-2 w-fit"
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

export { Services3 }
