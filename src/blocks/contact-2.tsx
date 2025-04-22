import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Paragraph } from "@/components/ui/paragraph"
import { Channels } from "@/components/channels"
import { Form } from "@/components/form"

export interface Contact2Props extends React.ComponentProps<"section"> {
  level?: number
  title: string
  description?: string
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
}

function Contact2({
  className,
  level = 2,
  title,
  description,
  channels,
  form,
  ...props
}: Contact2Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto grid w-full max-w-screen-xl gap-8 px-4 md:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start">
          <Heading size="4xl" level={level}>
            {title}
          </Heading>
          {description && (
            <Paragraph className="not-first:mt-4">{description}</Paragraph>
          )}
          {channels && (
            <Channels className="items-start not-first:mt-8" {...channels} />
          )}
        </div>
        {form && <Form {...form} />}
      </div>
    </section>
  )
}

export { Contact2 }
