import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Globe, TrendingUp, Award, Star } from "lucide-react"

export default function ShowcasePage() {
  const useCases = [
    {
      icon: Building2,
      title: "News Organizations",
      description:
        "Major news outlets use our platform to verify sources and detect misinformation before publication.",
      stats: "500+ articles verified daily",
      badge: "Media",
    },
    {
      icon: Users,
      title: "Social Media Platforms",
      description: "Social networks integrate our API to automatically flag suspicious content and protect users.",
      stats: "10M+ posts analyzed monthly",
      badge: "Social",
    },
    {
      icon: Globe,
      title: "Government Agencies",
      description: "Public sector organizations use our tools to combat disinformation campaigns and protect citizens.",
      stats: "15+ countries served",
      badge: "Public Sector",
    },
    {
      icon: TrendingUp,
      title: "Financial Institutions",
      description: "Banks and fintech companies detect fraud and scam attempts in communications and transactions.",
      stats: "99.2% fraud detection rate",
      badge: "Finance",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Editor, Digital News Network",
      content:
        "Reality Check has transformed our fact-checking process. We can now verify sources and detect bias in real-time, ensuring our readers get accurate information.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Security Director, TechBank",
      content:
        "The fraud detection capabilities are outstanding. We've reduced phishing incidents by 85% since implementing Reality Check across our communication channels.",
      rating: 5,
    },
    {
      name: "Dr. Emily Watson",
      role: "Research Director, Information Institute",
      content:
        "As researchers studying misinformation, we rely on Reality Check's advanced analytics. The detailed bias analysis and source verification are invaluable.",
      rating: 5,
    },
  ]

  const metrics = [
    { label: "Content Analyzed", value: "50M+", description: "Pieces of content processed" },
    { label: "Accuracy Rate", value: "94.7%", description: "Detection accuracy across all categories" },
    { label: "Response Time", value: "<2s", description: "Average analysis completion time" },
    { label: "Languages", value: "25+", description: "Supported languages and dialects" },
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-12 mb-4">Success Stories</h1>
        <p className="text-xl text-slate-11 max-w-3xl mx-auto">
          See how organizations worldwide are using Reality Check to combat misinformation and protect their
          communities.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {metrics.map((metric, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
              <div className="font-semibold text-slate-12 mb-1">{metric.label}</div>
              <div className="text-sm text-slate-11">{metric.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Use Cases */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-12 text-center mb-8">Industry Applications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <useCase.icon className="w-8 h-8 text-blue-600" />
                  <Badge variant="secondary">{useCase.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">{useCase.description}</CardDescription>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{useCase.stats}</span>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-12 text-center mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-11 italic">"{testimonial.content}"</p>
              </CardContent>
              <div className="absolute top-4 right-4">
                <Award className="w-6 h-6 text-blue-600 opacity-20" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Join the Fight Against Misinformation</CardTitle>
            <CardDescription className="text-lg">
              Ready to protect your organization and users from false information?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/check"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Try Free Analysis
              </a>
              <a
                href="mailto:contact@realitycheck.ai"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-6 text-slate-12 rounded-lg hover:bg-slate-2 transition-colors duration-200 font-medium"
              >
                Contact Sales
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
