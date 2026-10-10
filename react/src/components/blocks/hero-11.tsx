import * as React from "react"
import { cn } from "cn"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Rating } from "@/components/ui/rating"
import { Section, SectionContainer } from "@/components/ui/section"

function Hero11({
  className,
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
    width?: number
    height?: number
  }
}) {
  return (
    <Section
      className={cn(
        "dark min-h-screen justify-center bg-background",
        className
      )}
      {...props}
    >
      <SectionContainer className="relative z-10 flex flex-col items-center gap-8 text-center">
        <h1 className="max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-balance text-foreground/80">
          {description}
        </p>
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
        <div className="flex items-center gap-3">
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
      </SectionContainer>
      <div className="pointer-events-none absolute inset-0 bg-background mask-y-from-0% mask-y-to-100%">
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt=""
          width={image.width}
          height={image.height}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="size-full object-cover opacity-75"
        />
      </div>
    </Section>
  )
}

export { Hero11 }
