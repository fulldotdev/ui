import * as React from "react"

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
  SectionDescription,
} from "@/components/ui/section"

function Hero2({
  title,
  description,
  buttons,
  socialProof,
  image,
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
  image: {
    src: string
    srcSet?: string
    alt: string
    width?: number
    height?: number
  }
}) {
  return (
    <Section {...props}>
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <AvatarGroup aria-hidden="true">
            {socialProof.avatars.map((avatar) => (
              <Avatar
                key={avatar.initials}
                className="size-11 ring ring-background"
              >
                <AvatarImage src={avatar.image} alt="" />
                <AvatarFallback>{avatar.initials}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <div className="flex items-center gap-2">
            <Rating
              value={socialProof.rating}
              aria-label={socialProof.ratingLabel}
            />
            <span className="text-sm text-muted-foreground">
              {socialProof.text}
            </span>
          </div>
        </div>
        <h1 className="max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <SectionDescription className="max-w-2xl">
          {description}
        </SectionDescription>
        <div className="flex flex-wrap justify-center gap-3">
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
      </SectionContainer>
      <SectionContainer>
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 80rem) 80rem, 100vw"
          loading="eager"
          fetchPriority="high"
          className="aspect-video w-full rounded-xl border object-cover"
        />
      </SectionContainer>
    </Section>
  )
}

export { Hero2 }
