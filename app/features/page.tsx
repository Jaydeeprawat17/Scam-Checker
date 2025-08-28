import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Brain, Eye, Zap, Users, Globe, Lock, Smartphone } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze content patterns, language use, and credibility indicators.",
      badge: "Core Feature",
    },
    {
      icon: Shield,
      title: "Scam Detection",
      description: "Identify potential scams, phishing attempts, and fraudulent content across multiple platforms.",
      badge: "Security",
    },
    {
      icon: Eye,
      title: "Bias Recognition",
      description: "Detect political bias, emotional manipulation, and misleading framing in news and social media.",
      badge: "Analysis",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get instant results with our optimized AI models that process content in seconds.",
      badge: "Performance",
    },
    {
      icon: Users,
      title: "Source Verification",
      description: "Cross-reference claims with reliable sources and fact-checking databases.",
      badge: "Verification",
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Analyze content in multiple languages with specialized models for each region.",
      badge: "Global",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your content is processed securely and never stored or shared with third parties.",
      badge: "Privacy",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Full functionality across all devices with responsive design and mobile apps.",
      badge: "Accessibility",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-12 mb-4">Powerful Features</h1>
        <p className="text-xl text-slate-11 max-w-3xl mx-auto">
          Comprehensive AI-powered tools to help you navigate the digital information landscape with confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <feature.icon className="w-8 h-8 text-blue-600" />
                <Badge variant="secondary" className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              We're constantly improving our platform with new features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-slate-12 mb-2">Browser Extension</h3>
                <p className="text-slate-11">Analyze content directly in your browser as you browse.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-12 mb-2">API Access</h3>
                <p className="text-slate-11">Integrate our analysis tools into your own applications.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-12 mb-2">Team Collaboration</h3>
                <p className="text-slate-11">Share analyses and collaborate with your team members.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-12 mb-2">Custom Models</h3>
                <p className="text-slate-11">Train specialized models for your specific use cases.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
