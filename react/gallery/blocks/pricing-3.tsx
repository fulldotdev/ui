import { Pricing3 } from "@/components/blocks/pricing-3"

export default function Pricing3Demo() {
  return (
    <>
      <Pricing3
        badge="Limited offer"
        title="Everything you need in one plan"
        description="No complex tiers. One plan with everything included for your entire team."
        offer={{
          name: "Studio bundle",
          description:
            "Full access for teams managing content, product, and marketing.",
          price: {
            value: 249,
            currency: "USD",
            unit: "month",
          },
          features: [
            "Unlimited projects and users",
            "Advanced analytics and reporting",
            "Dedicated account manager",
            "Custom integrations and API",
            "SSO and enterprise security",
            "99.9% uptime SLA",
          ],
          button: { label: "Get started today", href: "/docs/" },
        }}
      />
    </>
  )
}
