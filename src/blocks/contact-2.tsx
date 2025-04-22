import { cn } from "@/lib/utils"
import { Channels } from "@/components/channels"
import { Description } from "@/components/description"
import { Form } from "@/components/form"
import { Title } from "@/components/title"

export interface Contact2Props extends React.ComponentProps<"section"> {
  level?: number
  title?: string
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
      <div className="mx-auto w-full max-w-screen-xl px-4 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-start">
            <Title size="4xl" level={level}>
              {title}
            </Title>
            {description && (
              <Description className="not-first:mt-4">
                {description}
              </Description>
            )}
            {channels && (
              <Channels className="items-start not-first:mt-8" {...channels} />
            )}
          </div>
          {form && <Form {...form} />}
        </div>
      </div>
    </section>
  )
}

export { Contact2 }
