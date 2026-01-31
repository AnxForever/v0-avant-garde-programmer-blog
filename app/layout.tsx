import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { ChaosModeToggle } from "@/components/chaos-mode-toggle"
import { CommandPalette } from "@/components/command-palette"
import { BASE_URL } from "@/lib/url"

// Font configuration with display swap for better LCP
const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Anx Forever | 数据科学 & 创意编程",
    template: "%s | Anx Forever",
  },
  description: "一个专注于数据科学、AI、前端开发与创意编程的个人博客。探索 BERT 文本检测、数据可视化和 Neo-Brutalist 设计。",
  keywords: [
    "数据科学", "人工智能", "BERT", "机器学习", "前端开发",
    "Next.js", "React", "TypeScript", "数据可视化", "创意编程",
    "Neo-Brutalism", "毕业设计", "AI文本检测"
  ],
  authors: [{ name: "Anx Forever", url: BASE_URL }],
  creator: "Anx Forever",
  publisher: "Anx Forever",
  openGraph: {
    title: "Anx Forever | 数据科学 & 创意编程",
    description: "一个专注于数据科学、AI、前端开发与创意编程的个人博客。",
    url: BASE_URL,
    siteName: "Anx Forever Blog",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Anx Forever Blog",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anx Forever | 数据科学 & 创意编程",
    description: "一个专注于数据科学、AI、前端开发与创意编程的个人博客。",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': `${BASE_URL}/feed.xml`,
    },
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <CustomCursor />
        <ChaosModeToggle />
        <CommandPalette />
        {children}
      </body>
    </html>
  )
}
