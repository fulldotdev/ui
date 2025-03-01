import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselRoot,
} from '@/components/ui/carousel'
import parseReact from 'html-react-parser'
import { parse as parseNode } from 'node-html-parser'

interface Props {
  className?: string
  children: any
}

export function Carousel({ children, className }: Props) {
  // TODO: typesafe als also working for non-astro use
  const value = children.props.value
  const root = parseNode(value)
  const items = root.children.map((child) => child.outerHTML)

  return (
    items && (
      <CarouselRoot className={className}>
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>{parseReact(item)}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselRoot>
    )
  )
}
