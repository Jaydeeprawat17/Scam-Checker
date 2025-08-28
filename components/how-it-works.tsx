import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Input",
      description: "Paste your suspicious message, link, or text",
      icon: "📝",
      details: "Support for Hindi, Hinglish, and English text",
    },
    {
      number: "2",
      title: "Analysis",
      description: "AI models analyze emotion, credibility, and links",
      icon: "🔍",
      details: "Multiple AI models work together for comprehensive analysis",
    },
    {
      number: "3",
      title: "Trust Score",
      description: "Get a clear 0-100 trust score with explanations",
      icon: "📊",
      details: "Color-coded results with actionable recommendations",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Simple 3-step process to verify any suspicious content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {step.number}
                  </div>
                  <div className="text-4xl mb-2">{step.icon}</div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-600 dark:text-slate-300 mb-2">{step.description}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{step.details}</p>
                </CardContent>
              </Card>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-slate-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
