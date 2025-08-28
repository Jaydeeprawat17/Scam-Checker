// Advanced Type Definitions - Senior Software Engineer approach
export interface AnalysisResult {
  readonly id: string
  readonly timestamp: Date
  readonly trustScore: number
  readonly riskLevel: "low" | "medium" | "high"
  readonly confidence: number
  readonly categories: ReadonlyArray<AnalysisCategory>
  readonly warnings: ReadonlyArray<SecurityWarning>
  readonly metadata: AnalysisMetadata
}

export interface AnalysisCategory {
  readonly name: string
  readonly score: number
  readonly status: "safe" | "moderate" | "danger"
  readonly details: string
  readonly confidence: number
}

export interface SecurityWarning {
  readonly id: string
  readonly type: "phishing" | "scam" | "misinformation" | "bias" | "manipulation"
  readonly severity: "low" | "medium" | "high" | "critical"
  readonly message: string
  readonly recommendation: string
}

export interface AnalysisMetadata {
  readonly contentLength: number
  readonly language: string
  readonly translationUsed: boolean
  readonly processingTime: number
  readonly modelVersion: string
}

export interface AnalysisRequest {
  readonly content: string
  readonly options?: {
    readonly includeTranslation?: boolean
    readonly detailedAnalysis?: boolean
    readonly customThresholds?: Record<string, number>
  }
}

// Error types for better error handling
export class AnalysisError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
  ) {
    super(message)
    this.name = "AnalysisError"
  }
}

export class ValidationError extends AnalysisError {
  constructor(
    message: string,
    public readonly field: string,
  ) {
    super(message, "VALIDATION_ERROR", 400)
    this.name = "ValidationError"
  }
}

export class RateLimitError extends AnalysisError {
  constructor(public readonly retryAfter: number) {
    super("Rate limit exceeded", "RATE_LIMIT_ERROR", 429)
    this.name = "RateLimitError"
  }
}
