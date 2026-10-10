import * as React from "react"

import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Features3({
  title,
  description,
  features,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  features: {
    title: string
    description: string
    image: {
      src: string
      srcSet?: string
      alt: string
      width?: number
      height?: number
    }
  }[]
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-6 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription className="max-w-2xl">
            {description}
          </SectionDescription>
        </div>
      </SectionContainer>
      <SectionContainer>
        <ul className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex items-center gap-5 rounded-xl border p-4"
            >
              <img
                src={feature.image.src}
                srcSet={feature.image.srcSet}
                alt={feature.image.alt}
                width={feature.image.width}
                height={feature.image.height}
                sizes="80px"
                loading="lazy"
                decoding="async"
                className="size-20 shrink-0 rounded-lg object-cover"
              />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </Section>
  )
}

export { Features3 }
