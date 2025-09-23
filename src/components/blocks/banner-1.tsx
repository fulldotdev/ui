interface Props {
  children?: React.ReactNode
}

export default function ({ children }: Props) {
  return (
    <header
      className="bg-primary top-0 z-10 flex h-auto w-full items-center py-1.5"
      id="banner"
    >
      <div className="text-primary-foreground container justify-center text-center text-sm font-medium">
        {children}
      </div>
    </header>
  )
}
