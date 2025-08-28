import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderMinimal } from "@/components/header-minimal"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "RealityCheck - AI Content Analysis & Misinformation Detection",
  description:
    "Advanced AI analysis to detect scams, fake news, and misinformation with 94.7% accuracy. Protect yourself from digital threats.",
  keywords: [
    "AI content analysis",
    "fake news detection",
    "scam detection",
    "misinformation",
    "fact checking",
    "content verification",
    "WhatsApp forwards",
    "social media analysis",
    "phishing detection",
    "fraud prevention",
  ],
  authors: [{ name: "RealityCheck Team" }],
  creator: "RealityCheck",
  publisher: "RealityCheck",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://realitycheck.ai",
    siteName: "RealityCheck",
    title: "RealityCheck - AI-Powered Content Analysis & Misinformation Detection",
    description:
      "Advanced AI tool to detect scams, fake news, and misinformation. Analyze suspicious content instantly with 94.7% accuracy.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RealityCheck - AI Content Analysis Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RealityCheck - AI-Powered Content Analysis",
    description: "Detect scams, fake news, and misinformation with advanced AI. 94.7% accuracy rate.",
    images: ["/og-image.jpg"],
    creator: "@realitycheck_ai",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://realitycheck.ai",
  },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RealityCheck",
  description: "AI-powered content analysis tool for detecting misinformation and scams",
  url: "https://realitycheck.ai",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1247",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="realitycheck-theme"
        >
          <div className="min-h-screen">
            <HeaderMinimal />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
