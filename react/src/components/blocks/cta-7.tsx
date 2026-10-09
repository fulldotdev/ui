import * as React from "react"
import { cn } from "cn"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import {
  Section,
  SectionContainer,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section"

function Cta7({
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
    count?: string | number
    text: string
  }
}) {
  return (
    <Section
      className={cn("border-y border-primary/15 bg-primary/10", className)}
      {...props}
    >
      <SectionContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-5">
          <SectionTitle className="leading-[1.1]">{title}</SectionTitle>
          <SectionDescription className="text-foreground/80">
            {description}
          </SectionDescription>
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
        <div className="flex flex-col items-center gap-4">
          <AvatarGroup aria-hidden="true">
            {socialProof.avatars.map((avatar, index) => (
              <Avatar
                key={avatar.initials + index}
                className="size-11 bg-background ring ring-primary/10"
              >
                <AvatarImage src={avatar.image} alt="" />
                <AvatarFallback>{avatar.initials}</AvatarFallback>
              </Avatar>
            ))}
            {socialProof.count != null && (
              <AvatarGroupCount className="size-11 bg-background text-foreground ring ring-primary/10">
                {socialProof.count}
              </AvatarGroupCount>
            )}
          </AvatarGroup>
          <span className="text-sm leading-snug text-foreground/80">
            {socialProof.text}
          </span>
        </div>
      </SectionContainer>
    </Section>
  )
}

export { Cta7 }
