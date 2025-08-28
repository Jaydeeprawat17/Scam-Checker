"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import clsx from "clsx"

export const NavbarLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        "relative z-10 px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl",
        isActive
          ? "text-white shadow-sm"
          : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50",
      )}
    >
      {children}
    </Link>
  )
}

export const NavbarLinkBackground = ({ links }: { links: string[] }) => {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const index = links.findIndex((link) => link === pathname)
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [pathname, links])

  const widthPercentage = 100 / links.length

  return (
    <div
      className="absolute inset-y-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300 ease-out shadow-lg"
      style={{
        left: `${activeIndex * widthPercentage}%`,
        width: `${widthPercentage}%`,
        marginLeft: "0.25rem",
        marginRight: "0.25rem",
        width: `calc(${widthPercentage}% - 0.5rem)`,
      }}
    />
  )
}
