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
  SectionTitle,
} from "@/components/ui/section"

function Cta1({
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
  socialProof?: {
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
    <Section variant="floating" {...props}>
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        {socialProof && (
          <div className="flex flex-col items-center gap-3">
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
        )}
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
                variant: index === 0 ? "default" : "secondary",
              })}
            >
              {label}
            </a>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Cta1 }
