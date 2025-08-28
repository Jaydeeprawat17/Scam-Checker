import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function UseCases() {
  const useCases = [
    {
      title: "WhatsApp Forwards",
      description: "Verify viral messages and chain forwards",
      example: '"Forward this to 10 people or bad luck will follow you"',
      risk: "Medium",
      icon: "💬",
    },
    {
      title: "Job Scams",
      description: "Detect fraudulent job offers and work-from-home schemes",
      example: '"Earn ₹50,000/month working from home! No experience needed!"',
      risk: "High",
      icon: "💼",
    },
    {
      title: "Health Misinformation",
      description: "Identify false medical claims and dangerous remedies",
      example: '"This one simple trick cures diabetes instantly!"',
      risk: "High",
      icon: "🏥",
    },
    {
      title: "Investment Scams",
      description: "Spot cryptocurrency and investment fraud",
      example: '"Double your money in 24 hours with this secret method"',
      risk: "High",
      icon: "💰",
    },
    {
      title: "Phishing Links",
      description: "Detect malicious URLs and shortened links",
      example: '"Click here to claim your prize: bit.ly/suspicious-link"',
      risk: "High",
      icon: "🔗",
    },
    {
      title: "Social Media Posts",
      description: "Verify trending news and viral content",
      example: '"BREAKING: Celebrity dies in car crash (unverified source)"',
      risk: "Medium",
      icon: "📱",
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <section className="py-16 bg-white/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Common Use Cases</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            RealityCheck helps you identify various types of misinformation and scams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">{useCase.icon}</div>
                  <Badge variant={getRiskColor(useCase.risk)}>{useCase.risk} Risk</Badge>
                </div>
                <CardTitle className="text-lg">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{useCase.description}</p>
                <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
                  <p className="text-sm italic text-slate-600 dark:text-slate-400">Example: "{useCase.example}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
