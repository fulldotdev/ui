import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
} from "@/components/ui/section"

export default function ({ children, links }: BlockProps) {
  return (
    <Section>
      <SectionContainer>
        <div className="bg-card text-card-foreground flex flex-col items-center rounded-lg border px-4 py-16 lg:px-8">
          {children && (
            <SectionContent className="text-center" size="5xl">
              {children}
            </SectionContent>
          )}
          {links && (
            <SectionFooter className="mt-10 justify-center">
              {links?.map(({ href, text }, i) => (
                <Link
                  key={href}
                  href={href}
                  variant={i === 0 ? "default" : "ghost"}
                  size="lg"
                >
                  {text}
                </Link>
              ))}
            </SectionFooter>
          )}
        </div>
      </SectionContainer>
    </Section>
  )
}
