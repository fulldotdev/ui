import type { BlockProps } from "@/lib/transforms"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { Link } from "@/components/ui/link"
import { Pattern } from "@/components/ui/pattern"
import { Section } from "@/components/ui/section"
import { Writeup } from "@/components/ui/writeup"

export default function ({
  title,
  description,
  children,
  links,
  image,
  chip,
}: BlockProps) {
  return (
    <Section className="relative overflow-hidden">
      <Pattern
        pattern="ai"
        className="-top-1/2 left-[-20%] h-[140%] w-[140%]"
      />
      <Container className="relative z-20 flex flex-col items-center">
        {chip && <Chip variant="outline" {...chip}></Chip>}
        <Writeup className="items-center text-center not-first:mt-4" size="xl">
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </Writeup>
        {links && links.length > 0 && (
          <div className="flex flex-col items-center gap-3 not-first:mt-8 md:flex-row">
            {links.map((link, i) => (
              <Link key={i} variant={i === 0 ? "default" : "ghost"} {...link} />
            ))}
          </div>
        )}
        {image && (
          <img
            className="max-h-96 w-full rounded-md object-cover not-first:mt-16"
            {...image}
          />
        )}
      </Container>
    </Section>
  )
}
