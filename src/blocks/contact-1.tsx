import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Channels } from "@/components/channels"
import { Form } from "@/components/form"

export interface Contact1Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
}

function Contact1({
  className,
  level = 2,
  title,
  description,
  channels,
  form,
  ...props
}: Contact1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 lg:px-8">
        <Heading size="4xl" level={level}>
          {title}
        </Heading>
        {description && <Paragraph className="mt-4">{description}</Paragraph>}
        {channels && <Channels className="mt-8" {...channels} />}
        {form && <Form className="mt-16" {...form} />}
      </div>
    </section>
  )
}

export { Contact1 }
