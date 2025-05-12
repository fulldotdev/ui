import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Writeup } from "@/components/ui/writeup"

export interface Events1Props extends React.ComponentProps<"section"> {
  items: {
    href: string
    title: string
    description: string
  }[]
}

function Events1({ className, children, items, ...props }: Events1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-md px-4 md:px-12">
        <div className="flex flex-col">
          {children && <Writeup size="4xl">{children}</Writeup>}
          <div className="mt-16 flex flex-col gap-4">
            {items?.map(({ href, title, description }) => (
              <a
                href={href}
                className="flex flex-col items-start gap-4 rounded-lg border p-6"
                key={href}
              >
                <Heading as="h3">{title}</Heading>
                <Paragraph>{description}</Paragraph>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Events1 }
