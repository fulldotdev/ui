import type { BlockProps } from "@/lib/types"
import { Logo, LogoImage } from "@/components/ui/logo"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"

export default function ({ children, logos }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center" size="xl">
            {children}
          </SectionContent>
        )}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {logos?.map(({ src, alt, title }, i) => (
            <Logo key={src}>
              {src && <LogoImage src={src} alt={alt} title={title} />}
              {title && title}
            </Logo>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
