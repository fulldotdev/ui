import * as React from "react"

import { placeholderImage } from "@/lib/placeholder-image"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Content3({
  title,
  description,
  buttons,
  image = { ...placeholderImage, alt: "" },
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
  image?: {
    src: string
    srcSet?: string
    alt: string
    width?: number
    height?: number
  }
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription className="mt-4">
              {description}
            </SectionDescription>
          </div>
          <div className="flex flex-wrap gap-3">
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
          loading="lazy"
          decoding="async"
          className="aspect-video w-full rounded-xl border object-cover"
        />
      </SectionContainer>
    </Section>
  )
}

export { Content3 }
