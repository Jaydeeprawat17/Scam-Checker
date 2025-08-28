import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Fight Misinformation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust RealityCheck to keep them safe online
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tool">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                🧠 Start Checking Now
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              📚 Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
