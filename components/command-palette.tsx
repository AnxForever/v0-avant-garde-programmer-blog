"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Search from "lucide-react/dist/esm/icons/search"
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right"
import Monitor from "lucide-react/dist/esm/icons/monitor"
import FileText from "lucide-react/dist/esm/icons/file-text"
import FlaskConical from "lucide-react/dist/esm/icons/flask-conical"
import User from "lucide-react/dist/esm/icons/user"
import Mail from "lucide-react/dist/esm/icons/mail"
import Zap from "lucide-react/dist/esm/icons/zap"
import type { LucideIcon } from "lucide-react"

type CommandItem = {
  icon: LucideIcon
  label: string
  color: string
} & (
  | { href: string; action?: never }
  | { action: () => void; href?: never }
)

// 提升到模块级别，避免每次渲染重建
const commandGroups = [
  {
    category: "NAVIGATION",
    items: [
      { icon: Monitor, label: "Work", href: "/work", color: "bg-accent-pink" },
      { icon: User, label: "About", href: "/about", color: "bg-accent-green" },
      { icon: FileText, label: "Blog", href: "/blog", color: "bg-accent-blue" },
      { icon: FlaskConical, label: "Lab", href: "/lab", color: "bg-accent-yellow" },
      { icon: Mail, label: "Contact", href: "/contact", color: "bg-accent-orange" },
    ],
  },
  {
    category: "ACTIONS",
    items: [
      {
        icon: Zap,
        label: "Toggle Chaos Mode",
        action: () => {
          const toggle = document.querySelector("button[aria-label*='混乱模式']") as HTMLButtonElement
          if (toggle) toggle.click()
        },
        color: "bg-black text-white",
      },
    ],
  },
]

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === "Escape") {
        e.preventDefault()
        setOpen(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const filteredCommands = commandGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((group) => group.items.length > 0)

  const handleSelect = (item: CommandItem) => {
    setOpen(false)
    if (item.href) {
      router.push(item.href)
    } else if (item.action) {
      item.action()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="命令面板"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            <div className="flex items-center border-b-4 border-black p-4">
              <Search className="w-6 h-6 mr-4" aria-hidden="true" />
              <label htmlFor="command-search" className="sr-only">搜索命令</label>
              <input
                id="command-search"
                className="w-full text-xl font-bold outline-none placeholder:text-gray-400 uppercase"
                placeholder="Type a command…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
              <div className="hidden md:flex gap-2">
                <kbd className="px-2 py-1 bg-gray-100 border-2 border-black text-xs font-bold">ESC</kbd>
              </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2" role="listbox" aria-label="命令列表">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center font-bold text-gray-500" role="status">NO RESULTS FOUND</div>
              ) : (
                filteredCommands.map((group, i) => (
                  <div key={i} className="mb-4" role="group" aria-label={group.category}>
                    <div className="px-2 py-1 text-xs font-black text-gray-500 mb-2">{group.category}</div>
                    {group.items.map((item, j) => (
                      <button
                        key={j}
                        onClick={() => handleSelect(item)}
                        role="option"
                        className="w-full flex items-center p-3 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all group"
                      >
                        <div
                          className={`p-2 border-2 border-black mr-4 ${item.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all`}
                        >
                          <item.icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-lg uppercase">{item.label}</span>
                        <ArrowRight className="ml-auto w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className="p-2 border-t-4 border-black bg-gray-50 text-xs font-mono text-center" aria-hidden="true">
              NAVIGATE WITH ARROWS • SELECT WITH ENTER
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
