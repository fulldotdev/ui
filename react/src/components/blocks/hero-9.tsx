import * as React from "react"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Rating } from "@/components/ui/rating"
import { Section, SectionContainer } from "@/components/ui/section"

function Hero9({
  className,
  title,
  description,
  features,
  buttons,
  socialProof,
  image,
  ...props
}: React.ComponentProps<"section"> & {
  title: string
  description: string
  features: string[]
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
      className={cn("dark bg-background text-foreground", className)}
      {...props}
    >
      <SectionContainer className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="text-lg leading-relaxed text-foreground/80">
              {description}
            </p>
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
        </div>
      </SectionContainer>
      <div className="pointer-events-none absolute inset-0 bg-background lg:mask-l-from-30%">
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt=""
          width={image.width}
          height={image.height}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="size-full object-cover opacity-50"
        />
      </div>
    </Section>
  )
}

export { Hero9 }
