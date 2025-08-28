// Performance Monitoring - Senior Software Engineer approach
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTiming(label: string): () => void {
    const start = performance.now()

    return () => {
      const end = performance.now()
      const duration = end - start

      if (!this.metrics.has(label)) {
        this.metrics.set(label, [])
      }

      this.metrics.get(label)!.push(duration)

      // Log slow operations in development
      if (process.env.NODE_ENV === "development" && duration > 100) {
        console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`)
      }
    }
  }

  getMetrics(label: string): { avg: number; min: number; max: number; count: number } | null {
    const measurements = this.metrics.get(label)
    if (!measurements || measurements.length === 0) return null

    return {
      avg: measurements.reduce((a, b) => a + b, 0) / measurements.length,
      min: Math.min(...measurements),
      max: Math.max(...measurements),
      count: measurements.length,
    }
  }

  clearMetrics(label?: string): void {
    if (label) {
      this.metrics.delete(label)
    } else {
      this.metrics.clear()
    }
  }
}

// React Performance Hook
export function usePerformanceMonitor(label: string) {
  const monitor = PerformanceMonitor.getInstance()

  return {
    startTiming: () => monitor.startTiming(label),
    getMetrics: () => monitor.getMetrics(label),
    clearMetrics: () => monitor.clearMetrics(label),
  }
}
