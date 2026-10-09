import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Section, SectionContainer } from "@/components/ui/section"

function Services6({
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
    href?: string
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Badge variant="secondary">{badge}</Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
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
                className="relative isolate flex aspect-square flex-col justify-end overflow-hidden rounded-xl bg-black"
              >
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 80rem) 436px, (min-width: 64rem) 35vw, (min-width: 40rem) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 size-full object-cover opacity-60"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="flex items-end justify-between gap-4 p-5 text-white">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-white/75">
                      {service.description}
                    </p>
                  </div>
                  {service.href != null && (
                    <a
                      href={service.href}
                      aria-label={service.title}
                      className="shrink-0 rounded-full bg-white/15 p-2 backdrop-blur-sm transition-colors hover:bg-white/25"
                    >
                      <ArrowRightIcon className="size-4 text-white" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Services6 }
