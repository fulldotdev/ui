import type { BlockProps } from "@/lib/types"
import { Logo, LogoImage } from "@/components/ui/logo"
import {
  Section,
  SectionContainer,
  SectionContent,
} from "@/components/ui/section"

export default function ({ children, images }: BlockProps) {
  return (
    <Section>
      <SectionContainer className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center" size="sm">
            {children}
          </SectionContent>
        )}
        <div className="flex flex-wrap justify-center gap-8 not-first:mt-8">
          {images?.map(({ src, alt, title }, i) => (
            <Logo key={i}>
              {src && <LogoImage src={src} alt={alt} title={title} />}
              {title}
            </Logo>
          ))}
        </div>
      </SectionContainer>
    </Section>
  )
}
