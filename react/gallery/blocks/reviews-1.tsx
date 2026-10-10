import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Reviews1 } from "@/components/blocks/reviews-1"

const placeholderImage = placeholder.src

export default function Reviews1Demo() {
  return (
    <>
      <Reviews1
        title="What customers say"
        description="Example reviews. Replace them with quotes from your customers."
        reviews={[
          {
            rating: 5,
            ratingLabel: "Rated 5 out of 5",
            quote:
              "Example review. Replace it with a short quote from a customer, in their own words.",
            image: placeholderImage,
            initials: "CA",
            name: "Customer A",
            role: "Role, company",
          },
          {
            rating: 5,
            ratingLabel: "Rated 5 out of 5",
            quote:
              "Example review about the result a customer got, such as time saved or a problem solved.",
            image: placeholderImage,
            initials: "CB",
            name: "Customer B",
            role: "Role, company",
          },
          {
            rating: 4.5,
            ratingLabel: "Rated 4.5 out of 5",
            quote:
              "Example review. Specific details, like what changed after working together, read as more credible.",
            image: placeholderImage,
            initials: "CC",
            name: "Customer C",
            role: "Role, company",
          },
        ]}
      />
    </>
  )
}
