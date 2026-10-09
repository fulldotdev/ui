import * as React from "react"
import { cn } from "cn"

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
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Cta4({
  className,
  title,
  description,
  buttons,
  socialProof,
  image = placeholderImage,
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
    width?: number
    height?: number
  }
}) {
  return (
    <Section
      variant="floating"
      className={cn(
        "dark overflow-hidden bg-background text-foreground",
        className
      )}
      {...props}
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        alt=""
        width={image.width}
        height={image.height}
        sizes="(min-width: 80rem) 80rem, 100vw"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-50"
      />
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-5">
          <SectionTitle className="leading-[1.1]">{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
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
                className="size-11 ring ring-background"
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
            <span className="text-sm text-muted-foreground">
              {socialProof.text}
            </span>
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Cta4 }
