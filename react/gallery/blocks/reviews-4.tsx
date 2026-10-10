import { placeholderImage as placeholder } from "@/lib/placeholder-image"
import { Reviews4 } from "@/components/blocks/reviews-4"

const placeholderImage = placeholder.src

export default function Reviews4Demo() {
  return (
    <>
      <Reviews4
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
            rating: 4.5,
            ratingLabel: "Rated 4.5 out of 5",
            quote:
              "Example review about the result a customer got, such as time saved or a problem solved.",
            image: placeholderImage,
            initials: "CB",
            name: "Customer B",
            role: "Role, company",
          },
          {
            rating: 5,
            ratingLabel: "Rated 5 out of 5",
            quote:
              "Example review. Specific details, like what changed after working together, read as more credible.",
            image: placeholderImage,
            initials: "CC",
            name: "Customer C",
            role: "Role, company",
          },
          {
            rating: 5,
            ratingLabel: "Rated 5 out of 5",
            quote:
              "Example review. Keep quotes short enough to read at a glance.",
            image: placeholderImage,
            initials: "CD",
            name: "Customer D",
            role: "Role, company",
          },
          {
            rating: 4.5,
            ratingLabel: "Rated 4.5 out of 5",
            quote:
              "Example review. Ask customers for permission before you publish their name and quote.",
            image: placeholderImage,
            initials: "CE",
            name: "Customer E",
            role: "Role, company",
          },
          {
            rating: 5,
            ratingLabel: "Rated 5 out of 5",
            quote:
              "Example review. Mention the service or product the customer used.",
            image: placeholderImage,
            initials: "CF",
            name: "Customer F",
            role: "Role, company",
          },
          {
            rating: 4.5,
            ratingLabel: "Rated 4.5 out of 5",
            quote:
              "Example review. Replace it with a short quote from a customer, in their own words.",
            image: placeholderImage,
            initials: "CG",
            name: "Customer G",
            role: "Role, company",
          },
          {
            rating: 5,
            ratingLabel: "Rated 5 out of 5",
            quote:
              "Example review about the result a customer got, such as time saved or a problem solved.",
            image: placeholderImage,
            initials: "CH",
            name: "Customer H",
            role: "Role, company",
          },
          {
            rating: 5,
            ratingLabel: "Rated 5 out of 5",
            quote:
              "Example review. Specific details, like what changed after working together, read as more credible.",
            image: placeholderImage,
            initials: "CI",
            name: "Customer I",
            role: "Role, company",
          },
          {
            rating: 4.5,
            ratingLabel: "Rated 4.5 out of 5",
            quote:
              "Example review. Keep quotes short enough to read at a glance.",
            image: placeholderImage,
            initials: "CJ",
            name: "Customer J",
            role: "Role, company",
          },
        ]}
        labels={{ play: "Play reviews", pause: "Pause reviews" }}
      />
    </>
  )
}
