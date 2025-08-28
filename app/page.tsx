import { HeroMinimal } from "@/components/hero-minimal"
import { About } from "@/components/about"
import { HowItWorks } from "@/components/how-it-works"
import { UseCases } from "@/components/use-cases"
import { CTA } from "@/components/cta"

export default function HomePage() {
  return (
    <div className="relative">
      <HeroMinimal />
      <About />
      <HowItWorks />
      <UseCases />
      <CTA />
    </div>
  )
}
