"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Command from "lucide-react/dist/esm/icons/command"

const links = [
  { href: "/work", label: "作品", color: "hover:bg-accent-pink" },
  { href: "/about", label: "关于", color: "hover:bg-accent-green" },
  { href: "/blog", label: "博客", color: "hover:bg-accent-blue" },
  { href: "/lab", label: "实验室", color: "hover:bg-accent-yellow" },
  { href: "/contact", label: "联系", color: "hover:bg-accent-orange" },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-50 bg-white border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-3 md:px-8 py-2 md:py-4 flex justify-between items-center max-w-7xl mx-auto">
      <Link
        href="/"
        className="text-base md:text-2xl font-black tracking-tighter hover:scale-105 transition-transform bg-black text-white px-2 py-1 rotate-[-2deg]"
      >
        <span className="hidden sm:inline">DEV_AVANT_GARDE</span>
        <span className="sm:hidden">DEV_AG</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-4 items-center">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="relative group">
            <span
              className={`block font-black text-sm tracking-widest border-2 border-black px-4 py-2 transition-all duration-200 ${
                pathname === link.href
                  ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] translate-x-[2px] translate-y-[2px]"
                  : `bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${link.color}`
              }`}
            >
              {link.label}
            </span>
          </Link>
        ))}

        {/* Command Palette Trigger */}
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
          aria-label="打开命令面板 (Cmd+K)"
          className="ml-4 flex items-center gap-2 font-bold text-xs border-2 border-black px-3 py-2 bg-gray-100 hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          <Command className="w-4 h-4" aria-hidden="true" />
          <span>CMD+K</span>
        </button>
      </div>

      {/* Mobile Nav Toggle */}
      <button
        className="md:hidden font-black text-xs tracking-widest border-2 border-black px-3 py-2 bg-accent-yellow shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "关闭导航菜单" : "打开导航菜单"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? "关闭" : "菜单"}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          id="mobile-menu"
          role="navigation"
          aria-label="移动端导航菜单"
          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-3 flex flex-col gap-2"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xl md:text-4xl font-black border-2 border-black p-3 md:p-4 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] md:hover:translate-x-[2px] md:hover:translate-y-[2px] transition-all ${link.color.replace("hover:", "")}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  )
}
