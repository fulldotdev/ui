import * as React from "react"
import { cn } from "cn"

import { placeholderImage } from "@/lib/placeholder-image"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Contact3({
  title,
  description,
  contactItems,
  image = { ...placeholderImage, alt: "" },
  children,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  contactItems: {
    icon: string
    title: string
    description: string
    href?: string
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
      <SectionContainer className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionTitle>{title}</SectionTitle>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {contactItems.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "icon" }),
                    "shrink-0 text-primary"
                  )}
                >
                  <Icon name={item.icon} />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  {item.href != null ? (
                    <a
                      href={item.href}
                      className="text-sm leading-relaxed wrap-anywhere text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {item.description}
                    </a>
                  ) : (
                    <p className="text-sm leading-relaxed wrap-anywhere text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {children != null && (
            <div className="rounded-xl border p-6">{children}</div>
          )}
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
          className="aspect-[3/4] w-full rounded-xl border object-cover lg:sticky lg:top-24"
        />
      </SectionContainer>
    </Section>
  )
}

export { Contact3 }
