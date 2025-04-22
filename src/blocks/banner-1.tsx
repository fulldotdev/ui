import { cn } from "@/lib/utils"

export interface Banner1Props extends React.ComponentProps<"header"> {
  list?: string[]
}

function Banner1({ className, id, list, ...props }: Banner1Props) {
  if (!list || list.length === 0) return null

  return (
    <header
      className={cn(
        "banner bg-primary text-primary-foreground relative z-10 flex h-8 items-center text-center text-sm leading-3.5 font-medium",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-evenly px-4 text-xs lg:px-8">
        {list.map((item, i) => (
          <span
            key={item}
            className={cn({
              "max-md:hidden": i > 0,
              "max-lg:hidden": i > 1,
              "max-xl:hidden": i > 2,
              hidden: i > 3,
            })}
          >
            {item}
          </span>
        ))}
      </div>
      <style>
        {`
          :root {
            --banner-height: calc(var(--spacing) * 8);
          }
        `}
      </style>
    </header>
  )
}

export { Banner1 }
