// Advanced Analysis Dashboard Component - Senior Software Engineer approach
import { memo } from "react"
import type { AnalysisResult } from "@/lib/types"
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader, EnhancedCardTitle } from "@/components/ui/enhanced-card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Brain, Clock, Globe, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalysisDashboardProps {
  result: AnalysisResult
  className?: string
}

// Memoized sub-components for performance
const TrustScoreCard = memo(({ result }: { result: AnalysisResult }) => {
  const getTrustScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400"
    if (score >= 40) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/30 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-950/30 dark:text-yellow-300"
      case "high":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <EnhancedCard variant="gradient" className="overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Analysis Complete</h2>
            <p className="opacity-90">Comprehensive AI-powered evaluation</p>
          </div>
          <Shield className="w-12 h-12 opacity-80" />
        </div>
      </div>

      <EnhancedCardContent className="p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Trust Score */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className={cn("text-6xl font-bold mb-2", getTrustScoreColor(result.trustScore))}>
                {result.trustScore}
              </div>
              <div className="absolute -top-2 -right-2">
                {result.trustScore >= 70 ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : result.trustScore >= 40 ? (
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-4">Trust Score</p>
            <Progress value={result.trustScore} className="h-3" />
          </div>

          {/* Risk Level */}
          <div className="text-center">
            <Badge className={cn("text-lg px-4 py-2 mb-4", getRiskBadgeVariant(result.riskLevel))}>
              {result.riskLevel.toUpperCase()} RISK
            </Badge>
            <p className="text-slate-600 dark:text-slate-400">Risk Assessment</p>
            <div className="mt-4 text-sm text-slate-500">Confidence: {Math.round(result.confidence * 100)}%</div>
          </div>

          {/* Metadata */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              {result.metadata.processingTime}ms
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Globe className="w-4 h-4" />
              {result.metadata.language.toUpperCase()}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Zap className="w-4 h-4" />
              Model {result.metadata.modelVersion}
            </div>
          </div>
        </div>
      </EnhancedCardContent>
    </EnhancedCard>
  )
})

const CategoryAnalysis = memo(({ categories }: { categories: AnalysisResult["categories"] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800"
      case "danger":
        return "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600 dark:text-green-400"
    if (score >= 40) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <EnhancedCard variant="elevated">
      <EnhancedCardHeader>
        <EnhancedCardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Category Analysis
        </EnhancedCardTitle>
      </EnhancedCardHeader>
      <EnhancedCardContent className="space-y-6">
        {categories.map((category, index) => (
          <div key={`${category.name}-${index}`} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-900 dark:text-white">{category.name}</span>
                <p className="text-xs text-slate-500 mt-1">{category.details}</p>
              </div>
              <Badge className={getStatusColor(category.status)} variant="outline">
                {category.status.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-2">
              <Progress value={category.score} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Score: {category.score}% (Confidence: {Math.round(category.confidence * 100)}%)
                </span>
                <span className={getTrustScoreColor(category.score)}>
                  {category.score >= 70 ? "Good" : category.score >= 40 ? "Fair" : "Poor"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </EnhancedCardContent>
    </EnhancedCard>
  )
})

const SecurityWarnings = memo(({ warnings }: { warnings: AnalysisResult["warnings"] }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-red-600 bg-red-50 dark:bg-red-950/20"
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      case "low":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <EnhancedCard variant="elevated">
      <EnhancedCardHeader>
        <EnhancedCardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Security Analysis
        </EnhancedCardTitle>
      </EnhancedCardHeader>
      <EnhancedCardContent className="space-y-4">
        {warnings.length > 0 ? (
          warnings.map((warning) => (
            <Alert key={warning.id} className={cn("border-l-4", getSeverityColor(warning.severity))}>
              <div className="flex items-start gap-3">
                {getSeverityIcon(warning.severity)}
                <div className="flex-1">
                  <AlertDescription className="font-medium mb-2">{warning.message}</AlertDescription>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Recommendation:</strong> {warning.recommendation}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {warning.type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {warning.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </Alert>
          ))
        ) : (
          <Alert className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              No security warnings detected. Content appears safe.
            </AlertDescription>
          </Alert>
        )}
      </EnhancedCardContent>
    </EnhancedCard>
  )
})

// Main component with performance optimizations
export const AnalysisDashboard = memo<AnalysisDashboardProps>(({ result, className }) => {
  return (
    <div className={cn("space-y-8 animate-fade-in", className)}>
      <TrustScoreCard result={result} />

      <div className="grid lg:grid-cols-2 gap-8">
        <CategoryAnalysis categories={result.categories} />
        <SecurityWarnings warnings={result.warnings} />
      </div>

      {/* AI Explanation */}
      <EnhancedCard variant="glass">
        <EnhancedCardHeader>
          <EnhancedCardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Analysis Summary
          </EnhancedCardTitle>
        </EnhancedCardHeader>
        <EnhancedCardContent>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            Based on comprehensive analysis using advanced machine learning models, this content has been evaluated
            across multiple dimensions including source credibility, factual accuracy, bias detection, and potential
            security threats. The analysis confidence is {Math.round(result.confidence * 100)}% with a processing time
            of {result.metadata.processingTime}ms.
          </p>

          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <h4 className="font-semibold mb-2">Analysis Metadata</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Content Length:</span>
                <div className="font-medium">{result.metadata.contentLength} chars</div>
              </div>
              <div>
                <span className="text-slate-500">Language:</span>
                <div className="font-medium">{result.metadata.language.toUpperCase()}</div>
              </div>
              <div>
                <span className="text-slate-500">Translation:</span>
                <div className="font-medium">{result.metadata.translationUsed ? "Yes" : "No"}</div>
              </div>
              <div>
                <span className="text-slate-500">Model Version:</span>
                <div className="font-medium">{result.metadata.modelVersion}</div>
              </div>
            </div>
          </div>
        </EnhancedCardContent>
      </EnhancedCard>
    </div>
  )
})

AnalysisDashboard.displayName = "AnalysisDashboard"

// Performance optimization: Only re-render when result changes
TrustScoreCard.displayName = "TrustScoreCard"
CategoryAnalysis.displayName = "CategoryAnalysis"
SecurityWarnings.displayName = "SecurityWarnings"
