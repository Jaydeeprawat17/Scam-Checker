"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Target, Sparkles } from "lucide-react"
import Link from "next/link"
import { HeroBackground } from "./background-effects"

export function HeroMinimal() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-modern text-sm font-medium border">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>AI-Powered Content Analysis</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="block text-foreground">Detect Scams &</span>
              <span className="block gradient-text">Misinformation</span>
              <span className="block text-foreground">Instantly</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced AI analysis to protect you from fake news, scams, and digital threats with{" "}
              <span className="font-semibold text-foreground">94.7% accuracy</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              asChild
              size="lg"
              className="group px-8 py-6 text-lg font-medium bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/check">
                Start Analysis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium glass-modern border-border/50 hover:border-border transition-all duration-300 bg-transparent"
            >
              <Link href="/features">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="glass-modern p-8 rounded-2xl border animate-slide-up">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">94.7%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>

            <div className="glass-modern p-8 rounded-2xl border animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-center w-16 h-16 bg-purple-500/10 dark:bg-purple-500/20 rounded-2xl mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">2.3M+</div>
              <div className="text-muted-foreground">Threats Blocked</div>
            </div>

            <div className="glass-modern p-8 rounded-2xl border animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl mx-auto mb-4">
                <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{"<0.5s"}</div>
              <div className="text-muted-foreground">Analysis Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
