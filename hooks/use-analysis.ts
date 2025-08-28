"use client"

// Advanced Custom Hook - Senior Software Engineer approach
import { useState, useCallback, useRef } from "react"
import { type AnalysisResult, type AnalysisRequest, AnalysisError } from "@/lib/types"

interface UseAnalysisState {
  result: AnalysisResult | null
  isLoading: boolean
  error: AnalysisError | null
  progress: number
}

interface UseAnalysisReturn extends UseAnalysisState {
  analyze: (request: AnalysisRequest) => Promise<void>
  reset: () => void
  cancel: () => void
}

export function useAnalysis(): UseAnalysisReturn {
  const [state, setState] = useState<UseAnalysisState>({
    result: null,
    isLoading: false,
    error: null,
    progress: 0,
  })

  const abortControllerRef = useRef<AbortController | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const analyze = useCallback(async (request: AnalysisRequest) => {
    // Validation
    if (!request.content.trim()) {
      setState((prev) => ({
        ...prev,
        error: new AnalysisError("Content cannot be empty", "EMPTY_CONTENT", 400),
      }))
      return
    }

    if (request.content.length > 10000) {
      setState((prev) => ({
        ...prev,
        error: new AnalysisError("Content too long (max 10,000 characters)", "CONTENT_TOO_LONG", 400),
      }))
      return
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    setState({
      result: null,
      isLoading: true,
      error: null,
      progress: 0,
    })

    // Simulate progress
    progressIntervalRef.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        progress: Math.min(prev.progress + Math.random() * 20, 90),
      }))
    }, 200)

    try {
      // Simulate API call with realistic delay
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 2500 + Math.random() * 1500)

        abortControllerRef.current?.signal.addEventListener("abort", () => {
          clearTimeout(timeout)
          reject(new AnalysisError("Analysis cancelled", "CANCELLED", 499))
        })
      })

      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      // Mock sophisticated analysis result
      const mockResult: AnalysisResult = {
        id: `analysis_${Date.now()}`,
        timestamp: new Date(),
        trustScore: Math.floor(Math.random() * 100),
        riskLevel: (["low", "medium", "high"] as const)[Math.floor(Math.random() * 3)],
        confidence: 0.85 + Math.random() * 0.15,
        categories: [
          {
            name: "Source Credibility",
            score: Math.floor(Math.random() * 100),
            status: (["safe", "moderate", "danger"] as const)[Math.floor(Math.random() * 3)],
            details: "Analysis of source reputation and authority",
            confidence: 0.9,
          },
          {
            name: "Fact Verification",
            score: Math.floor(Math.random() * 100),
            status: (["safe", "moderate", "danger"] as const)[Math.floor(Math.random() * 3)],
            details: "Cross-reference with verified information sources",
            confidence: 0.85,
          },
          {
            name: "Bias Detection",
            score: Math.floor(Math.random() * 100),
            status: (["safe", "moderate", "danger"] as const)[Math.floor(Math.random() * 3)],
            details: "Analysis of language patterns and framing",
            confidence: 0.8,
          },
          {
            name: "Emotional Manipulation",
            score: Math.floor(Math.random() * 100),
            status: (["safe", "moderate", "danger"] as const)[Math.floor(Math.random() * 3)],
            details: "Detection of persuasion and manipulation techniques",
            confidence: 0.88,
          },
        ],
        warnings: [
          ...(Math.random() > 0.5
            ? [
                {
                  id: "w1",
                  type: "phishing" as const,
                  severity: "high" as const,
                  message: "Suspicious links detected that may lead to phishing sites",
                  recommendation: "Do not click on any links in this content",
                },
              ]
            : []),
          ...(Math.random() > 0.3
            ? [
                {
                  id: "w2",
                  type: "manipulation" as const,
                  severity: "medium" as const,
                  message: "Content uses emotional manipulation techniques",
                  recommendation: "Verify claims through independent sources",
                },
              ]
            : []),
        ],
        metadata: {
          contentLength: request.content.length,
          language: "en",
          translationUsed: request.content.includes("आप") || request.content.includes("você"),
          processingTime: 2500 + Math.random() * 1500,
          modelVersion: "v2.1.0",
        },
      }

      setState({
        result: mockResult,
        isLoading: false,
        error: null,
        progress: 100,
      })
    } catch (error) {
      if (error instanceof AnalysisError) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error,
          progress: 0,
        }))
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: new AnalysisError("An unexpected error occurred", "UNKNOWN_ERROR"),
          progress: 0,
        }))
      }
    } finally {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }
  }, [])

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    setState({
      result: null,
      isLoading: false,
      error: null,
      progress: 0,
    })
  }, [])

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  return {
    ...state,
    analyze,
    reset,
    cancel,
  }
}
