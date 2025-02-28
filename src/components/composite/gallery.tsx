import {
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel as CarouselRoot,
} from '@/components/ui/carousel'
import parseReact from 'html-react-parser'
import { parse as parseNode } from 'node-html-parser'
import { useEffect, useState } from 'react'

interface Props {
  children: any
}

export function Gallery({ children }: Props) {
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>()
  const [emblaThumbnailApi, setEmblaThumbnailApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Parse children to get HTML items
  const value = children.props?.value
  const root = parseNode(value)
  const items = root.children.map((child) => child.outerHTML)

  useEffect(() => {
    if (!emblaMainApi || !emblaThumbnailApi) return

    const onSelect = () => {
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
      emblaThumbnailApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }

    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)

    // Initial selection
    onSelect()

    return () => {
      emblaMainApi.off('select', onSelect)
      emblaMainApi.off('reInit', onSelect)
    }
  }, [emblaMainApi, emblaThumbnailApi])

  const onThumbClick = (index: number) => {
    if (!emblaMainApi) return
    emblaMainApi.scrollTo(index)
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <CarouselRoot
        className="relative"
        setApi={setEmblaMainApi}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="rounded-md overflow-hidden"
            >
              {parseReact(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </CarouselRoot>

      <CarouselRoot setApi={setEmblaThumbnailApi}>
        <CarouselContent className="flex gap-2 ml-0">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className={`pl-0 basis-1/5 cursor-pointer border rounded-md overflow-hidden ${
                index === selectedIndex ? 'border-ring border-2' : ''
              }`}
              onClick={() => onThumbClick(index)}
            >
              {parseReact(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </CarouselRoot>
    </div>
  )
}
