import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, Code, Zap, Shield, Globe, Users } from "lucide-react"

export default function DocsPage() {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of content analysis and how to use our platform effectively.",
      items: ["Quick Start Guide", "Understanding Analysis Scores", "Interpreting Results", "Best Practices"],
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "Integrate our analysis capabilities into your applications with our REST API.",
      items: ["Authentication", "Endpoints Reference", "Rate Limits", "SDKs & Libraries"],
    },
    {
      icon: Zap,
      title: "Advanced Features",
      description: "Explore powerful features for enterprise users and advanced analysis needs.",
      items: ["Batch Processing", "Custom Models", "Webhook Integration", "Real-time Monitoring"],
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Learn about our security measures and privacy protection policies.",
      items: ["Data Protection", "Encryption Standards", "Compliance (GDPR, CCPA)", "Security Audits"],
    },
  ]

  const quickLinks = [
    { title: "API Reference", href: "#api", badge: "Technical" },
    { title: "Tutorials", href: "#tutorials", badge: "Learning" },
    { title: "FAQ", href: "#faq", badge: "Support" },
    { title: "Changelog", href: "#changelog", badge: "Updates" },
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-12 mb-4">Documentation</h1>
        <p className="text-xl text-slate-11 max-w-3xl mx-auto">
          Everything you need to know about using Reality Check to analyze content and detect misinformation.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {quickLinks.map((link, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Badge variant="secondary" className="mb-2">
                {link.badge}
              </Badge>
              <h3 className="font-semibold text-slate-12">{link.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {sections.map((section, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <section.icon className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
              <CardDescription className="text-base">{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-slate-11 hover:text-slate-12 cursor-pointer transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Code Example */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Quick API Example
          </CardTitle>
          <CardDescription>Get started with our API in just a few lines of code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-12 text-slate-1 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-green-400">// Analyze content with Reality Check API</div>
            <div className="mt-2">
              <span className="text-blue-400">const</span> response = <span className="text-blue-400">await</span>{" "}
              <span className="text-yellow-400">fetch</span>(
              <span className="text-green-300">'https://api.realitycheck.ai/analyze'</span>, {"{"}
            </div>
            <div className="ml-4">
              method: <span className="text-green-300">'POST'</span>,
            </div>
            <div className="ml-4">headers: {"{"}</div>
            <div className="ml-8">
              <span className="text-green-300">'Authorization'</span>:{" "}
              <span className="text-green-300">'Bearer YOUR_API_KEY'</span>,
            </div>
            <div className="ml-8">
              <span className="text-green-300">'Content-Type'</span>:{" "}
              <span className="text-green-300">'application/json'</span>
            </div>
            <div className="ml-4">{"}"}</div>
            <div className="ml-4">
              body: <span className="text-yellow-400">JSON</span>.<span className="text-yellow-400">stringify</span>(
              {"{"}
            </div>
            <div className="ml-8">
              content: <span className="text-green-300">'Your content to analyze here...'</span>
            </div>
            <div className="ml-4">{"}"}</div>
            <div>{"}"});</div>
            <div className="mt-2">
              <span className="text-blue-400">const</span> result = <span className="text-blue-400">await</span>{" "}
              response.<span className="text-yellow-400">json</span>();
            </div>
            <div>
              <span className="text-yellow-400">console</span>.<span className="text-yellow-400">log</span>
              (result.credibilityScore);
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Community Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-11">
              Join our community of developers and researchers working to combat misinformation.
            </p>
            <div className="space-y-2">
              <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                → Discord Community
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                → GitHub Discussions
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                → Stack Overflow
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Enterprise Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-11">
              Get dedicated support for your organization's implementation and integration needs.
            </p>
            <div className="space-y-2">
              <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                → Contact Sales Team
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                → Schedule Demo
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-700 transition-colors">
                → Custom Integration
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
