import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Shield, Zap, Users, CheckCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                RealityCheck
              </span>
              <div className="text-xs text-slate-500 font-medium">AI-Powered</div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-full mb-8">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Trusted by 50,000+ users worldwide
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-slate-900 dark:text-white">Stop the</span>
            <span className="block bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
              Fake News
            </span>
            <span className="block text-slate-900 dark:text-white">Epidemic</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto">
            Advanced AI technology that analyzes content in real-time to detect{" "}
            <span className="font-semibold text-slate-900 dark:text-white">scams</span>,{" "}
            <span className="font-semibold text-slate-900 dark:text-white">misinformation</span>, and{" "}
            <span className="font-semibold text-slate-900 dark:text-white">fake news</span> with{" "}
            <span className="font-bold text-green-600">94.7% accuracy</span>.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Shield, text: "Scam Protection", color: "from-red-500 to-pink-500" },
              { icon: Zap, text: "Instant Analysis", color: "from-yellow-500 to-orange-500" },
              { icon: Users, text: "25+ Languages", color: "from-green-500 to-emerald-500" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`p-1 rounded-full bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/tool">
              <Button
                size="lg"
                className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Start Analysis Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
              </Button>
            </Link>

            <Link href="/examples">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 bg-transparent"
              >
                View Examples
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { metric: "50M+", label: "Content Analyzed" },
              { metric: "94.7%", label: "Accuracy Rate" },
              { metric: "<2s", label: "Analysis Time" },
              { metric: "25+", label: "Languages" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">{stat.metric}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
