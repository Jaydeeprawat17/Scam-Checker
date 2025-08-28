import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, XCircle, MessageSquare, Newspaper, Mail } from "lucide-react"

export default function ExamplesPage() {
  const examples = [
    {
      type: "Social Media Post",
      icon: MessageSquare,
      content:
        "🚨 URGENT: New study shows that drinking lemon water every morning can cure diabetes! Doctors hate this one simple trick. Share before it gets banned! #health #diabetes #cure",
      analysis: {
        score: 15,
        risk: "high",
        flags: [
          "Sensationalized language ('URGENT', 'Doctors hate this')",
          "Unsubstantiated medical claims",
          "Pressure tactics ('Share before it gets banned')",
          "No credible sources cited",
        ],
      },
    },
    {
      type: "News Article",
      icon: Newspaper,
      content:
        "According to a peer-reviewed study published in the Journal of Medical Research, researchers at Stanford University found that regular exercise combined with a balanced diet can reduce the risk of heart disease by up to 40%. The study followed 10,000 participants over 5 years.",
      analysis: {
        score: 92,
        risk: "low",
        flags: [
          "Cites specific, credible source",
          "Mentions peer review process",
          "Provides study methodology details",
          "Makes reasonable, evidence-based claims",
        ],
      },
    },
    {
      type: "Email/Phishing",
      icon: Mail,
      content:
        "CONGRATULATIONS! You've won $1,000,000 in the International Lottery! To claim your prize, please send your bank details and $500 processing fee to secure@lottery-winner.com. Act fast - this offer expires in 24 hours!",
      analysis: {
        score: 5,
        risk: "high",
        flags: [
          "Classic lottery scam pattern",
          "Requests personal financial information",
          "Demands upfront payment",
          "Creates false urgency",
          "Suspicious email domain",
        ],
      },
    },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-12 mb-4">Analysis Examples</h1>
        <p className="text-xl text-slate-11 max-w-3xl mx-auto">
          See how our AI analyzes different types of content to detect misinformation, scams, and bias.
        </p>
      </div>

      <div className="space-y-8">
        {examples.map((example, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <example.icon className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl">{example.type}</CardTitle>
                </div>
                <Badge className={getRiskColor(example.analysis.risk)}>
                  {example.analysis.risk.toUpperCase()} RISK
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content Sample */}
              <div>
                <h3 className="font-semibold text-slate-12 mb-2">Sample Content:</h3>
                <div className="p-4 bg-slate-2 rounded-lg border-l-4 border-slate-6">
                  <p className="text-slate-11 italic">"{example.content}"</p>
                </div>
              </div>

              {/* Analysis Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-12 mb-3">Credibility Score</h3>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(example.analysis.score)}`}>
                      {example.analysis.score}%
                    </div>
                    <Progress value={example.analysis.score} className="mb-2" />
                    <div className="flex items-center justify-center gap-1">
                      {example.analysis.risk === "low" ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : example.analysis.risk === "moderate" ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="text-sm text-slate-11 capitalize">{example.analysis.risk} Risk</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-12 mb-3">Analysis Flags</h3>
                  <div className="space-y-2">
                    {example.analysis.flags.map((flag, flagIndex) => (
                      <div key={flagIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-6 mt-2 flex-shrink-0" />
                        <span className="text-slate-11">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Try It Yourself</CardTitle>
            <CardDescription className="text-lg">
              Ready to analyze your own content? Use our analysis tool to get detailed insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href="/check"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Start Analysis
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
