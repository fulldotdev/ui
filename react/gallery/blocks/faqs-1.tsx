import { Faqs1 } from "@/components/blocks/faqs-1"

export default function Faqs1Demo() {
  return (
    <>
      <Faqs1
        title="Frequently asked questions"
        description="Everything you need to know about our product. Can't find the answer you're looking for? Reach out to our support team."
        buttons={[
          { label: "Contact support", href: "#" },
          { label: "Documentation", href: "#" },
        ]}
        faqs={[
          {
            id: "faq-1-1",
            question: "How do I get started with the platform?",
            answer:
              "Sign up for an account, choose a plan that fits your needs, and follow our quick-start guide. You can be up and running in under five minutes.",
          },
          {
            id: "faq-1-2",
            question: "Can I upgrade or downgrade my plan at any time?",
            answer:
              "Yes. You can switch plans whenever you like. Changes take effect at the start of your next billing cycle and any unused credit is prorated.",
          },
          {
            id: "faq-1-3",
            question: "What payment methods do you accept?",
            answer:
              "We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice.",
          },
          {
            id: "faq-1-4",
            question: "Is there a free trial available?",
            answer:
              "Every new account comes with a 14-day free trial with full access to all features. No credit card required to start.",
          },
        ]}
      />
    </>
  )
}
