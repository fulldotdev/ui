import { cn } from "@/lib/utils"
import Image from "@/components/elements/image"
import Links from "@/components/elements/links"
import Prose from "@/components/elements/prose"
import Container from "@/components/structures/container"
import Section from "@/components/structures/section"
import Split from "@/components/structures/split"

interface Props {
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  children?: React.ReactNode
  links?: React.ComponentProps<typeof Links>["links"]
  image?: React.ComponentProps<typeof Image>
}

export default function ({ align, children, links, image, size }: Props) {
  return (
    <Section id="content">
      <Container>
        <Split align={align}>
          <div className="flex w-full flex-col items-start">
            <Prose size={size}>{children}</Prose>
            <Links className="not-first:mt-8" size={size} links={links} />
          </div>
          <Image className="rounded-lg" {...image} />
        </Split>
      </Container>
    </Section>
  )
}
