"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

// 路由对应的强调色
const routeColors: Record<string, string> = {
  "/work": "#FF00FF",   // accent-pink
  "/about": "#00FF00",  // accent-green
  "/blog": "#00BFFF",   // accent-blue
  "/lab": "#FFFF00",    // accent-yellow
  "/contact": "#FF6600", // accent-orange
}

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [color, setColor] = useState("#000000")
  const prefersReducedMotion = useReducedMotion()
  const isFirstMount = useRef(true)

  useEffect(() => {
    // 首次加载不触发转场
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    if (prefersReducedMotion) return

    // 根据路由确定颜色
    const matchedRoute = Object.entries(routeColors).find(([route]) =>
      pathname.startsWith(route)
    )
    setColor(matchedRoute ? matchedRoute[1] : "#000000")
    setIsTransitioning(true)

    const timer = setTimeout(() => setIsTransitioning(false), 600)
    return () => clearTimeout(timer)
  }, [pathname, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key={pathname}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(100% 0 0 0)" }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ backgroundColor: color }}
          className="fixed inset-0 z-[60] pointer-events-none"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  )
}
