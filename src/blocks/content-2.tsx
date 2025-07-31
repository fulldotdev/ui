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
          <div className="flex flex-col items-start">
            {children && <SectionContent>{children}</SectionContent>}
            {links && links.length > 0 && (
              <SectionFooter className="not-first:mt-6">
                {links?.map(({ text, href, ...link }, i) => (
                  <Link
                    key={i}
                    href={href}
                    variant={i === 0 ? "secondary" : "ghost"}
                    {...link}
                  >
                    {text}
                  </Link>
                ))}
              </SectionFooter>
            )}
          </div>
          {image?.src && (
            <img
              className="mb-[20%] origin-top-left scale-120 rounded-lg"
              {...image}
            />
          )}{" "}
        </SectionSplit>
      </SectionContainer>
    </Section>
  )
}
