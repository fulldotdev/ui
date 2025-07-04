import type { BlockProps } from "@/lib/types"
import { Logo, LogoImage } from "@/components/ui/logo"
import { Section, SectionContainer } from "@/components/ui/section"
import { Social } from "@/components/ui/social"

export default function ({ logo, links, socials, copyright }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center gap-8">
        {logo && (
          <Logo href="/">
            {logo?.src && <LogoImage {...logo} />}
            {logo?.title && logo.title}
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
        {copyright && (
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {copyright}
          </p>
        )}
      </SectionContainer>
    </Section>
  )
}
