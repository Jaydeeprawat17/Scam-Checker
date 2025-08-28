"use client"

export function NextJSBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="nextjs-bg absolute inset-0" />

      {/* Grid pattern */}
      <div className="nextjs-grid absolute inset-0" />

      {/* Dot pattern overlay */}
      <div className="dot-pattern absolute inset-0 opacity-30" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      />
    </div>
  )
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Next.js style gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent dark:from-blue-500/10 dark:via-purple-500/5 dark:to-transparent blur-3xl" />

      {/* Grid overlay */}
      <div className="nextjs-grid absolute inset-0 opacity-50" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
