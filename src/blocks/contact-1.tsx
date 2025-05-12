import { cn } from "@/lib/utils"
import { Writeup } from "@/components/ui/writeup"
import { Channels } from "@/components/channels"
import { Form } from "@/components/form"

export interface Contact1Props extends React.ComponentProps<"section"> {
  channels?: React.ComponentProps<typeof Channels>
  form?: React.ComponentProps<typeof Form>
}

function Contact1({
  className,
  children,
  channels,
  form,
  ...props
}: Contact1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-md flex-col px-4 lg:px-8">
        {children && <Writeup size="4xl">{children}</Writeup>}
        {channels && <Channels className="not-first:mt-8" {...channels} />}
        {form && <Form className="not-first:mt-16" {...form} />}
      </div>
    </section>
  )
}

export { Contact1 }
