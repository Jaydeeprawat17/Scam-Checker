import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function About() {
  return (
    <section className="py-16 bg-white/50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What is RealityCheck?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            RealityCheck is an AI-powered tool designed to help you identify scams, fake news, and misinformation in
            real-time. Perfect for the digital age where misinformation spreads faster than truth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">🛡️</div>
              <CardTitle>Protect Yourself</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                Stay safe from online scams, fraudulent job offers, and malicious links that could compromise your
                security.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">🌍</div>
              <CardTitle>Fight Misinformation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                Combat the spread of fake news and misleading information that can harm communities and democracy.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">🧠</div>
              <CardTitle>AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                Advanced machine learning models analyze text patterns, emotions, and credibility indicators.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
