// Minimal, sophisticated header
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MinimalButton } from "@/components/ui/minimal-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Examples", href: "/examples" },
  { name: "Docs", href: "/docs" },
]

export function HeaderMinimal() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-neutral-900 dark:bg-white rounded-md flex items-center justify-center">
              <span className="text-white dark:text-neutral-900 text-sm font-medium">R</span>
            </div>
            <span className="text-lg font-medium text-neutral-900 dark:text-white">RealityCheck</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/tool">
              <MinimalButton size="sm">Try Now</MinimalButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
