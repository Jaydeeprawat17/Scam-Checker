import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-6 bg-slate-1">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-12">Reality Check</h3>
            <p className="text-sm text-slate-11">
              AI-powered content analysis to combat misinformation and protect digital communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-12">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/check" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Try Analysis
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-12">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Showcase
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Research
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-12">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-11 hover:text-slate-12 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-6 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-11">© 2024 Reality Check. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
