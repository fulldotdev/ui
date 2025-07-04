import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/ui/link"
import {
  Section,
  SectionContainer,
  SectionContent,
  SectionFooter,
  SectionSplit,
} from "@/components/ui/section"

export default function ({ children, links, image }: BlockProps) {
  return (
    <Section className="flex min-h-screen items-center">
      <SectionContainer className="px-0 lg:px-0">
        <SectionSplit className="items-center gap-y-16 md:grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-start px-4 lg:px-8">
            <SectionContent className="w-full" size="lg">
              {children}
            </SectionContent>
            {links && links.length > 0 && (
              <SectionFooter className="mt-8">
                {links.map(({ href, text }, i) => (
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
          {image && (
            <img
              className="top-0 right-0 h-full w-1/2 object-cover lg:absolute"
              {...image}
            />
          )}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
