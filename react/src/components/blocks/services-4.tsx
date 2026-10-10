import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Services4({
  title,
  description,
  buttons,
  services,
  ...props
}: React.ComponentProps<"section"> & {
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
    link?: {
      label: string
      href: string
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionTitle>{title}</SectionTitle>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const image = service.image ?? { ...placeholderImage, alt: "" }
            return (
              <article key={service.title} className="flex flex-col gap-4">
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 80rem) 294px, (min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-base font-medium">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                {service.link && (
                  <a
                    href={service.link.href}
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {service.link.label}
                    <ArrowRightIcon className="size-3.5" />
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Services4 }
