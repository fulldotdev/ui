import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Prose } from "@/components/ui/prose"
import { Social } from "@/components/ui/social"
import { Form } from "@/components/form"

export interface Person1Props extends React.ComponentProps<"section"> {
  title: string
  tagline?: string
  image: {
    src: string
    alt: string
  }
  socials?: string[]
  buttons?: {
    variant?: "default" | "outline" | "secondary" | "ghost"
    text: string
    href: string
  }[]
  form?: any
}

function Person1({
  className,
  title,
  tagline,
  image,
  socials,
  buttons,
  form,
  children,
  ...props
}: Person1Props) {
  return (
    <section className={cn("relative w-full", className)} {...props}>
      <div className="mx-auto grid w-full max-w-screen-xl flex-col items-start md:grid-cols-3">
        <div className="bg-card flex rounded-lg border py-8 md:sticky md:top-24 md:bottom-8 md:col-span-1 md:my-12 md:ml-4 md:p-6 lg:ml-8">
          <div className="mx-auto flex w-full max-w-sm flex-col items-center max-md:px-4">
            <img
              className="aspect-square w-full max-w-36 rounded-full object-cover"
              {...image}
            />
            <Heading className="mt-5" size="xl" as="h1">
              {title}
            </Heading>
            <p className="text-muted-foreground mt-1.5 text-center text-sm">
              {tagline}
            </p>
            <div className="mt-5 flex gap-2">
              {socials?.map((social) => <Social key={social} href={social} />)}
            </div>
            <div className="mt-5 flex w-full flex-col gap-2">
              {buttons?.map(({ href, text, ...button }) => (
                <Button variant="outline" size="lg" asChild {...button}>
                  <a href={href}>{text}</a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="my-12 flex w-full flex-col items-center px-4 md:col-span-2 lg:px-8">
          <Prose className="">{children}</Prose>
          {form && <Form id="form" className="mt-16" {...form} />}
        </div>
      </div>
    </section>
  )
}

export { Person1 }
