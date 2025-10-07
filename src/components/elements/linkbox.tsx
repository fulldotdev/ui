export default function ({
  children,
  className,
  ...props
}: React.ComponentProps<"a"> & React.ComponentProps<"div">) {
  if ("href" in props && props.href) return <a {...props}>{children}</a>
  return <div {...props}>{children}</div>
}
