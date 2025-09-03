import type { BlockProps } from "@/lib/types"
import { Container } from "@/components/elements/container"
import { Link } from "@/components/elements/link"
import { Section } from "@/components/elements/section"
import { Wrap } from "@/components/elements/wrap"
import { Writeup } from "@/components/elements/writeup"

export default function ({ children, links, size, align }: BlockProps) {
  return (
    <Section>
      <Container>
        <div className="bg-card text-card-foreground flex flex-col items-center rounded-lg border px-4 py-16 lg:px-8">
          {children && (
            <Writeup
              className="max-w-3xl text-center"
              size={size}
              align={align}
            >
              {children}
            </Writeup>
          )}
          {links && (
            <Wrap className="not-first:mt-10" align={align}>
              {links?.map(({ href, text }, i) => (
                <Link
                  key={href}
                  href={href}
                  variant={i === 0 ? "default" : "outline"}
                  size={size}
                >
                  {text}
                </Link>
              ))}
            </Wrap>
          )}
        </div>
      </Container>
    </Section>
  )
}
