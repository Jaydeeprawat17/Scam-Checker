"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, Brain, AlertCircle } from "lucide-react"
import Link from "next/link"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard, MinimalCardHeader, MinimalCardContent, MinimalCardTitle } from "@/components/ui/minimal-card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useAnalysis } from "@/hooks/use-analysis"
import { cn } from "@/lib/utils"

export default function ToolPage() {
  const [input, setInput] = useState("")
  const { result, isLoading, error, progress, analyze, reset } = useAnalysis()

  const handleAnalyze = useCallback(async () => {
    if (!input.trim()) return
    await analyze({ content: input.trim() })
  }, [input, analyze])

  const isValid = input.trim().length > 0 && input.length <= 10000

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-6 py-8">
        {/* Minimal header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/">
            <MinimalButton variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </MinimalButton>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-neutral-900 dark:bg-white rounded-md flex items-center justify-center">
              <Brain className="w-3 h-3 text-white dark:text-neutral-900" />
            </div>
            <h1 className="text-xl font-medium text-neutral-900 dark:text-white">Content Analyzer</h1>
          </div>
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input section */}
          <MinimalCard variant="elevated">
            <MinimalCardHeader>
              <MinimalCardTitle>Analyze Content</MinimalCardTitle>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                Paste any suspicious message, article, or social media post for instant AI analysis.
              </p>
            </MinimalCardHeader>

            <MinimalCardContent className="space-y-6">
              <div className="relative">
                <Textarea
                  placeholder="Paste your content here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={cn(
                    "min-h-[120px] resize-none border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors",
                    !isValid && input.length > 0 && "border-red-300 focus:border-red-400",
                  )}
                  disabled={isLoading}
                />
                <div className="absolute bottom-3 right-3 text-xs text-neutral-400">{input.length}/10,000</div>
              </div>

              {/* Progress */}
              {isLoading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                    <span>Analyzing...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700 dark:text-red-300">{error.message}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <MinimalButton onClick={handleAnalyze} disabled={!isValid || isLoading} className="flex-1 sm:flex-none">
                  {isLoading ? "Analyzing..." : "Analyze"}
                </MinimalButton>

                {result && (
                  <MinimalButton variant="ghost" onClick={reset}>
                    Reset
                  </MinimalButton>
                )}
              </div>
            </MinimalCardContent>
          </MinimalCard>

          {/* Results */}
          {result && (
            <div className="animate-slide-up space-y-6">
              {/* Trust Score */}
              <MinimalCard variant="elevated">
                <MinimalCardContent className="p-8 text-center">
                  <div className="mb-4">
                    <div
                      className={cn(
                        "text-5xl font-medium mb-2",
                        result.trustScore >= 70
                          ? "text-green-600"
                          : result.trustScore >= 40
                            ? "text-yellow-600"
                            : "text-red-600",
                      )}
                    >
                      {result.trustScore}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">Trust Score</p>
                  </div>

                  <Progress value={result.trustScore} className="max-w-xs mx-auto" />

                  <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)} Risk •
                    {Math.round(result.confidence * 100)}% Confidence
                  </div>
                </MinimalCardContent>
              </MinimalCard>

              {/* Categories */}
              <div className="grid md:grid-cols-2 gap-6">
                {result.categories.map((category, index) => (
                  <MinimalCard key={index} variant="bordered">
                    <MinimalCardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-neutral-900 dark:text-white">{category.name}</h3>
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            category.status === "safe"
                              ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                              : category.status === "moderate"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
                                : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
                          )}
                        >
                          {category.status}
                        </span>
                      </div>

                      <Progress value={category.score} className="mb-2" />

                      <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                        <span>{category.score}%</span>
                        <span>{Math.round(category.confidence * 100)}% confidence</span>
                      </div>
                    </MinimalCardContent>
                  </MinimalCard>
                ))}
              </div>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <MinimalCard variant="bordered">
                  <MinimalCardHeader>
                    <MinimalCardTitle>Security Warnings</MinimalCardTitle>
                  </MinimalCardHeader>
                  <MinimalCardContent className="space-y-3">
                    {result.warnings.map((warning) => (
                      <div key={warning.id} className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">
                              {warning.message}
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">{warning.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </MinimalCardContent>
                </MinimalCard>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
