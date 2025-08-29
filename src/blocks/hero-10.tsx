import type { BlockProps } from "@/lib/transforms"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { Link } from "@/components/ui/link"
import { Section } from "@/components/ui/section"
import { Writeup } from "@/components/ui/writeup"

export default function ({
  title,
  description,
  links,
  image,
  chip,
  children,
}: BlockProps) {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {chip && <Chip variant="outline" {...chip} />}
            <Writeup className="not-first:mt-8" size="xl">
              {title && <h1>{title}</h1>}
              {description && <p>{description}</p>}
              {children}
            </Writeup>
            {links && links.length > 0 && (
              <div className="flex w-full flex-col justify-center gap-2 not-first:mt-8 sm:flex-row lg:justify-start">
                {links?.map((link, i) => (
                  <Link
                    className="w-full sm:w-auto"
                    variant={i === 0 ? "default" : "outline"}
                    size="lg"
                    {...link}
                  />
                ))}
              </div>
            )}
          </div>
          {image && (
            <img
              src={image?.src}
              alt={image?.alt}
              className="max-h-96 w-full rounded-md object-cover"
            />
          )}
        </div>
      </Container>
    </Section>
  )
}
