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
    <Section className="overflow-hidden">
      <SectionContainer>
        <SectionSplit className="items-center">
          <div className="flex flex-col items-start lg:col-span-2">
            <SectionContent size="5xl">{children}</SectionContent>
            {links && links.length > 0 && (
              <SectionFooter className="mt-8">
                {links.map(({ href, text, ...link }, i) => (
                  <Link
                    key={href}
                    href={href}
                    variant={i === 0 ? "default" : "ghost"}
                    size="lg"
                    {...link}
                  >
                    {text}
                  </Link>
                ))}
              </SectionFooter>
            )}
          </div>
          {image && (
            <img
              className="mb-[20%] origin-top-left scale-120 rounded-lg lg:col-span-3"
              {...image}
            />
          )}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
