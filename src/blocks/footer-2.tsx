import type { BlockProps } from "@/lib/types"
import { Container } from "@/components/elements/container"
import { Logo, LogoImage } from "@/components/elements/logo"
import { Section } from "@/components/elements/section"
import { Social } from "@/components/elements/social"

export default function ({ image, title, links, socials }: BlockProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-8">
        {(image || title) && (
          <Logo href="/">
            {image?.src && <LogoImage {...image} />}
            {title}
          </Logo>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {links?.map(({ text, href }, i) => (
              <a
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                key={i}
                href={href}
              >
                {text}
              </a>
            ))}
          </div>
        )}
        {socials && socials.length > 0 && (
          <div className="flex gap-4">
            {socials?.map((social, i) => (
              <Social
                className="text-muted-foreground hover:text-foreground !size-auto"
                key={i}
                variant="link"
                href={social}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
