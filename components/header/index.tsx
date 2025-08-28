import { NavbarLink, NavbarLinkBackground } from "./link"
import clsx from "clsx"

export const Header = async () => {
  // Fallback navigation data when BaseHub is not available
  const navbar = {
    items: [
      { href: "/", _title: "Home" },
      { href: "/features", _title: "Features" },
      { href: "/examples", _title: "Examples" },
      { href: "/showcase", _title: "Showcase" },
      { href: "/docs", _title: "Docs" },
    ],
  }

  return (
    <div className="sticky top-4 z-50 flex flex-col items-center justify-center px-4">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-900/5">
        <div className={clsx("bg-transparent rounded-2xl p-2 flex relative items-center gap-1")}>
          {/* Animated background */}
          <NavbarLinkBackground links={navbar.items.map((item) => item.href!)} />

          {/* Navigation items */}
          {navbar.items.map(({ href, _title }) => (
            <NavbarLink key={href} href={href ?? "/"}>
              {_title}
            </NavbarLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
