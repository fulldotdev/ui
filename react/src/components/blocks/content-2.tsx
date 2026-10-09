import * as React from "react"
import { CheckIcon } from "lucide-react"

import { placeholderImage } from "@/lib/placeholder-image"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Content2({
  title,
  description,
  features,
  buttons,
  image = { ...placeholderImage, alt: "" },
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  features: string[]
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
      <SectionContainer className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
          </div>
          <ul className="flex flex-col gap-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
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
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 80rem) 600px, (min-width: 64rem) 50vw, 100vw"
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full rounded-xl border object-cover"
        />
      </SectionContainer>
    </Section>
  )
}

export { Content2 }
