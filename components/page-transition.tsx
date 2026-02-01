"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

// 路由显示名称
const routeNames: Record<string, string> = {
  "/": "HOME",
  "/blog": "BLOG",
  "/work": "WORK",
  "/lab": "LAB",
  "/about": "ABOUT",
  "/contact": "CONTACT",
}

// 路由强调色
const routeAccents: Record<string, string> = {
  "/": "#ff006e",
  "/blog": "#00d9ff",
  "/work": "#ff006e",
  "/lab": "#ccff00",
  "/about": "#ccff00",
  "/contact": "#ff6b00",
}

const COLUMN_COUNT = 5
const STAGGER_DELAY = 0.06

function getRouteName(pathname: string): string {
  // 详情页显示父路由名
  const match = pathname.match(/^\/(blog|work|lab)\//)
  if (match) {
    const parent = `/${match[1]}`
    return routeNames[parent] || "PAGE"
  }
  return routeNames[pathname] || "PAGE"
}

function getRouteAccent(pathname: string): string {
  const base = "/" + (pathname.split("/")[1] || "")
  return routeAccents[base] || "#ff006e"
}

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayName, setDisplayName] = useState("HOME")
  const [accent, setAccent] = useState("#ff006e")
  const prefersReducedMotion = useReducedMotion()
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    if (prefersReducedMotion) return

    setDisplayName(getRouteName(pathname))
    setAccent(getRouteAccent(pathname))
    setIsTransitioning(true)

    const timer = setTimeout(() => setIsTransitioning(false), 1200)
    return () => clearTimeout(timer)
  }, [pathname, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div
          key={pathname}
          className="fixed inset-0 z-[60] pointer-events-none"
          aria-hidden="true"
        >
          {/* 竖条百叶窗 */}
          {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.1,
                times: [0, 0.35, 0.65, 1],
                ease: [0.22, 1, 0.36, 1],
                delay: i * STAGGER_DELAY,
              }}
              style={{
                position: "absolute",
                left: `${(i / COLUMN_COUNT) * 100}%`,
                width: `${100 / COLUMN_COUNT + 0.5}%`,
                top: 0,
                bottom: 0,
                backgroundColor: "#1a1a1a",
                transformOrigin: "bottom",
              }}
            />
          ))}

          {/* 强调色竖条（更细，交错偏移） */}
          {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
            <motion.div
              key={`accent-${i}`}
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.0,
                times: [0, 0.35, 0.6, 1],
                ease: [0.22, 1, 0.36, 1],
                delay: i * STAGGER_DELAY + 0.04,
              }}
              style={{
                position: "absolute",
                left: `${(i / COLUMN_COUNT) * 100 + 1}%`,
                width: `${100 / COLUMN_COUNT * 0.15}%`,
                top: 0,
                bottom: 0,
                backgroundColor: accent,
                transformOrigin: "bottom",
                opacity: 0.6,
              }}
            />
          ))}

          {/* 路由名称文字 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20],
            }}
            transition={{
              duration: 1.1,
              times: [0, 0.3, 0.65, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: COLUMN_COUNT * STAGGER_DELAY * 0.5,
            }}
            className="absolute inset-0 z-[62] flex items-center justify-center"
          >
            <span
              className="font-black text-[15vw] md:text-[12vw] tracking-tighter leading-none select-none"
              style={{
                color: accent,
                textShadow: `0 0 40px ${accent}40`,
              }}
            >
              {displayName}
            </span>
          </motion.div>

          {/* 底部装饰线 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.0,
              times: [0, 0.4, 0.6, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "15%",
              height: "4px",
              backgroundColor: accent,
              transformOrigin: "left",
            }}
          />

          {/* 顶部装饰线 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.0,
              times: [0, 0.4, 0.6, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "15%",
              height: "4px",
              backgroundColor: accent,
              transformOrigin: "right",
            }}
          />
        </div>
      )}
    </AnimatePresence>
  )
}
