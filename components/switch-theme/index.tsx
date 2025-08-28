"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import clsx from "clsx"

const options = ["dark", "system", "light"] as const

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Handle mounting state
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={clsx(className, "flex gap-1 opacity-0")}>
        {options.map((option, i) => (
          <React.Fragment key={option}>
            <button className="text-xs">
              <span>{option}</span>
            </button>
            {i < options.length - 1 && <span className="text-xs">/</span>}
          </React.Fragment>
        ))}
      </div>
    )
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    // Force a small delay to ensure theme is applied
    setTimeout(() => {
      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark" || (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches),
      )
    }, 10)
  }

  return (
    <div className={clsx(className, "flex gap-1")}>
      {options.map((option, i) => (
        <React.Fragment key={option}>
          <button
            className={clsx(
              "text-xs text-slate-10 flex items-center justify-center gap-1 max-w-max transition-colors",
              theme === option && "!text-slate-12 font-medium",
            )}
            style={{
              fontFeatureSettings: '"ss01"',
              fontVariationSettings: '"wght" 500',
            }}
            onClick={() => handleThemeChange(option)}
          >
            <span className="first-letter:uppercase">{option}</span>
          </button>
          {i < options.length - 1 && <span className="text-xs text-slate-8">/</span>}
        </React.Fragment>
      ))}
    </div>
  )
}
