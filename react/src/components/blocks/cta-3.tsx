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
import {
  Section,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/section"

function Cta3({
  className,
  title,
  description,
  buttons,
  socialProof,
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
}) {
  return (
    <Section
      variant="floating"
      className={cn("bg-accent/50 shadow-none", className)}
      {...props}
    >
      <SectionContainer className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex flex-col gap-5">
          <SectionTitle className="leading-[1.1]">{title}</SectionTitle>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:items-end">
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
              <span className="text-xs text-muted-foreground">
                {socialProof.text}
              </span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Cta3 }
