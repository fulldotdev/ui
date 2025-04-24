import { cn } from "@/lib/utils"
import { Prose } from "@/components/ui/prose"

export interface Content1Props extends React.ComponentProps<"section"> {
  content?: string
}

function Content1({ className, content, children, ...props }: Content1Props) {
  return (
    <section className={cn("relative w-full py-16", className)} {...props}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-4 lg:px-8">
        <Prose>
          {content}
          {children}
        </Prose>
      </div>
    </section>
  )
}

export { Content1 }
