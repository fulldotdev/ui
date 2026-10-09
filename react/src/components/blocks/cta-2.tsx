import * as React from "react"

import { placeholderImage } from "@/lib/placeholder-image"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Rating } from "@/components/ui/rating"
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Cta2({
  title,
  description,
  buttons,
  socialProof,
  image = { ...placeholderImage, alt: "" },
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
  socialProof: {
    avatars: {
      image?: string
      initials: string
    }[]
    rating: number
    ratingLabel: string
    text: string
  }
  image?: {
    src: string
    srcSet?: string
    alt: string
    width?: number
    height?: number
  }
}) {
  return (
    <Section variant="floating" {...props}>
      <SectionContainer className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <SectionTitle className="leading-[1.1]">{title}</SectionTitle>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {buttons.map(({ href, label }, index) => (
              <a
                key={href + label}
                href={href}
                className={buttonVariants({
                  size: "lg",
                  variant: index === 0 ? "default" : "outline",
                })}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <AvatarGroup aria-hidden="true">
              {socialProof.avatars.map((avatar, index) => (
                <Avatar
                  key={avatar.initials + index}
                  className="size-10 ring ring-background"
                >
                  <AvatarImage src={avatar.image} alt="" />
                  <AvatarFallback>{avatar.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <div className="flex flex-col gap-0.5">
              <Rating
                value={socialProof.rating}
                aria-label={socialProof.ratingLabel}
              />
              <span className="text-xs text-muted-foreground">
                {socialProof.text}
              </span>
            </div>
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

export { Cta2 }
