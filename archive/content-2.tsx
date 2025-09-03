import type { BlockProps } from "@/lib/types"
import { Link } from "@/components/elements/link"
import {
  Container,
  Section,
  SectionContent,
  SectionFooter,
  SectionSplit,
} from "@/components/elements/section"
import { Split } from "@/components/elements/split"

export default function ({ children, links, image }: BlockProps) {
  return (
    <Section className="overflow-hidden">
      <Container>
        <Split className="items-center">
          <div className="flex flex-col items-start">
            {children && <SectionContent>{children}</SectionContent>}
            {links && links.length > 0 && (
              <SectionFooter className="not-first:mt-6">
                {links?.map(({ text, href, ...link }, i) => (
                  <Link
                    key={i}
                    href={href}
                    variant={i === 0 ? "outline" : "ghost"}
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
      </Container>
    </Section>
  )
}
