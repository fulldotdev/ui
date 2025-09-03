import type { BlockProps } from "@/lib/types"
import { Logo, LogoImage } from "@/components/elements/logo"
import {
  Container,
  Section,
  SectionContent,
} from "@/components/elements/section"

export default function ({ children, images }: BlockProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center">
        {children && (
          <SectionContent className="text-center" size="sm">
            {children}
          </SectionContent>
        )}
        <div className="flex flex-wrap justify-center gap-8 not-first:mt-8">
          {images?.map(({ src, alt }, i) => (
            <Logo key={i}>{src && <LogoImage src={src} alt={alt} />}</Logo>
          ))}
        </div>
      </Container>
    </Section>
  )
}
