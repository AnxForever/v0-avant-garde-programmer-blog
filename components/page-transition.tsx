"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef, useMemo, useCallback, memo } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const TRANSITION_DURATION = 900 // 优化：缩短动画时长

// 性能优化：GPU 加速样式
const GPU_STYLES = {
  willChange: "transform, opacity",
  backfaceVisibility: "hidden" as const,
  perspective: 1000,
  transform: "translateZ(0)",
}

// 性能优化：contain 隔离样式
const CONTAIN_STYLES = {
  contain: "layout paint" as const,
}

// 路由名称
const routeNames: Record<string, string> = {
  "/": "HOME",
  "/blog": "BLOG",
  "/work": "WORK",
  "/lab": "LAB",
  "/about": "ABOUT",
  "/contact": "CONTACT",
}

// 配色方案 - 渐变 + 装饰色
const routeThemes = {
  "/": {
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    accent1: "#ffecd2",
    accent2: "#fcb69f",
    pattern: "dots",
    textColor: "#ffffff",
  },
  "/blog": {
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)",
    accent1: "#fff1eb",
    accent2: "#ace0f9",
    pattern: "lines",
    textColor: "#0a2540",
  },
  "/work": {
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 50%, #fa709a 100%)",
    accent1: "#ffecd2",
    accent2: "#fcb69f",
    pattern: "circles",
    textColor: "#ffffff",
  },
  "/lab": {
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)",
    accent1: "#e0c3fc",
    accent2: "#8ec5fc",
    pattern: "grid",
    textColor: "#2d3748",
  },
  "/about": {
    gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 50%, #c2e9fb 100%)",
    accent1: "#ffecd2",
    accent2: "#d4fc79",
    pattern: "waves",
    textColor: "#2d3748",
  },
  "/contact": {
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
    accent1: "#a1c4fd",
    accent2: "#c2e9fb",
    pattern: "diamonds",
    textColor: "#4a1942",
  },
}

type TransitionType = "mosaic" | "blinds" | "ripple" | "shutter" | "cascade" | "portal" | "sweep"

const routeTransitions: Record<string, TransitionType> = {
  "/": "mosaic",
  "/blog": "blinds",
  "/work": "ripple",
  "/lab": "shutter",
  "/about": "cascade",
  "/contact": "portal",
}

function getTransitionType(pathname: string): TransitionType {
  if (pathname.match(/^\/(blog|work|lab)\/[^/]+$/)) {
    return "sweep"
  }
  const baseRoute = "/" + (pathname.split("/")[1] || "")
  return routeTransitions[baseRoute] || "mosaic"
}

function getRouteTheme(pathname: string) {
  const baseRoute = "/" + (pathname.split("/")[1] || "")
  return routeThemes[baseRoute as keyof typeof routeThemes] || routeThemes["/"]
}

function getRouteName(pathname: string): string {
  if (pathname.match(/^\/(blog|work|lab)\/[^/]+$/)) {
    const parent = "/" + pathname.split("/")[1]
    return routeNames[parent] || "PAGE"
  }
  return routeNames[pathname] || "PAGE"
}

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const transitionType = useMemo(() => getTransitionType(pathname), [pathname])
  const theme = useMemo(() => getRouteTheme(pathname), [pathname])
  const routeName = useMemo(() => getRouteName(pathname), [pathname])

  // 获取基础路由（用于跟踪）
  const baseRoute = useMemo(() => {
    if (pathname.match(/^\/(blog|work|lab)\/[^/]+$/)) {
      return pathname // 详情页用完整路径
    }
    return "/" + (pathname.split("/")[1] || "") // 列表页用基础路径
  }, [pathname])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof window === "undefined") return

    // 检查这个页面是否已访问过
    const visitedRoutes = JSON.parse(sessionStorage.getItem("visited-routes") || "[]")

    if (!visitedRoutes.includes(baseRoute)) {
      // 首次访问这个页面，播放动画
      setIsTransitioning(true)

      // 记录已访问
      visitedRoutes.push(baseRoute)
      sessionStorage.setItem("visited-routes", JSON.stringify(visitedRoutes))

      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, TRANSITION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [baseRoute, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <>
      {/* 顶部进度条 */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION / 1000, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: theme.gradient,
              transformOrigin: "left",
              zIndex: 70,
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isTransitioning && (
          <TransitionRenderer
            key={pathname}
            type={transitionType}
            theme={theme}
            routeName={routeName}
          />
        )}
      </AnimatePresence>
    </>
  )
}

interface Theme {
  gradient: string
  accent1: string
  accent2: string
  pattern: string
  textColor: string
}

interface TransitionRendererProps {
  type: TransitionType
  theme: Theme
  routeName: string
}

function TransitionRenderer({ type, theme, routeName }: TransitionRendererProps) {
  switch (type) {
    case "mosaic":
      return <MosaicTransition theme={theme} routeName={routeName} />
    case "blinds":
      return <BlindsTransition theme={theme} routeName={routeName} />
    case "ripple":
      return <RippleTransition theme={theme} routeName={routeName} />
    case "shutter":
      return <ShutterTransition theme={theme} routeName={routeName} />
    case "cascade":
      return <CascadeTransition theme={theme} routeName={routeName} />
    case "portal":
      return <PortalTransition theme={theme} routeName={routeName} />
    case "sweep":
      return <SweepTransition theme={theme} routeName={routeName} />
    default:
      return <MosaicTransition theme={theme} routeName={routeName} />
  }
}

// ========================================
// 路由名称显示组件（使用 keyframe 动画确保完整进出）
// ========================================
function RouteNameDisplay({ name, textColor }: { name: string; textColor: string }) {
  const letters = name.split("")

  return (
    <div className="absolute inset-0 z-[65] flex items-center justify-center pointer-events-none">
      <div className="flex overflow-hidden">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: [100, 0, 0, -100],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.3, 0.7, 1],
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              color: textColor,
              display: "inline-block",
            }}
            className="font-black text-[15vw] md:text-[12vw] tracking-tight leading-none select-none"
          >
            {letter}
          </motion.span>
        ))}
      </div>
      {/* 装饰下划线 */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 0.7,
          times: [0, 0.3, 0.7, 1],
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          bottom: "30%",
          left: "20%",
          right: "20%",
          height: "4px",
          background: textColor,
          transformOrigin: "center",
        }}
      />
    </div>
  )
}

// ========================================
// 装饰图案组件
// ========================================
function PatternOverlay({ pattern, color }: { pattern: string; color: string }) {
  const getPattern = () => {
    switch (pattern) {
      case "dots":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="3" fill={color} opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        )
      case "lines":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="40" x2="40" y2="0" stroke={color} strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lines)" />
          </svg>
        )
      case "circles":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="circles" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circles)" />
          </svg>
        )
      case "grid":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="40" height="40" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        )
      case "waves":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        )
      case "diamonds":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diamonds)" />
          </svg>
        )
      default:
        return null
    }
  }
  return <>{getPattern()}</>
}

// ========================================
// 1. 马赛克 - 首页 (优化：减少方块数量)
// ========================================
function MosaicTransition({ theme, routeName }: { theme: Theme; routeName: string }) {
  const rows = 3  // 优化：从5减少到3
  const cols = 4  // 优化：从6减少到4
  const tiles = useMemo(() =>
    Array.from({ length: rows * cols }, (_, i) => ({
      row: Math.floor(i / cols),
      col: i % cols,
    })), [])

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" style={CONTAIN_STYLES} aria-hidden="true">
      {/* 渐变底层 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        style={{ background: theme.gradient, ...GPU_STYLES }}
        className="absolute inset-0"
      />

      {/* 装饰图案 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 0.8, times: [0, 0.35, 0.65, 1] }}
        className="absolute inset-0"
        style={GPU_STYLES}
      >
        <PatternOverlay pattern={theme.pattern} color={theme.accent1} />
      </motion.div>

      {/* 马赛克方块 */}
      {tiles.map(({ row, col }, i) => {
        const delay = (row + col) * 0.04
        const isAccent = (row + col) % 3 === 0
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.7,
              times: [0, 0.3, 0.6, 1],
              ease: [0.34, 1.56, 0.64, 1],
              delay,
            }}
            style={{
              position: "absolute",
              left: `${(col / cols) * 100}%`,
              top: `${(row / rows) * 100}%`,
              width: `${100 / cols + 1}%`,
              height: `${100 / rows + 1}%`,
              background: isAccent
                ? `linear-gradient(45deg, ${theme.accent1}, ${theme.accent2})`
                : "rgba(255,255,255,0.15)",
              borderRadius: "4px",
              ...GPU_STYLES,
            }}
          />
        )
      })}

      {/* 路由名称 */}
      <RouteNameDisplay name={routeName} textColor={theme.textColor} />

      {/* 装饰圆点 - 优化：减少数量 */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          initial={{ scale: 0, y: 30 }}
          animate={{ scale: [0, 1.2, 0], y: [30, 0, -30] }}
          transition={{
            duration: 0.7,
            delay: 0.1 + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            left: `${15 + (i % 3) * 30}%`,
            top: `${25 + Math.floor(i / 3) * 50}%`,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: i % 2 === 0 ? theme.accent1 : theme.accent2,
            ...GPU_STYLES,
          }}
        />
      ))}
    </div>
  )
}

// ========================================
// 2. 百叶窗 - 博客 (优化：减少条数)
// ========================================
function BlindsTransition({ theme, routeName }: { theme: Theme; routeName: string }) {
  const blindCount = 6 // 优化：从10减少到6

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" style={CONTAIN_STYLES} aria-hidden="true">
      {/* 渐变底层 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.25, 0.75, 1] }}
        style={{ background: theme.gradient, ...GPU_STYLES }}
        className="absolute inset-0"
      />

      {/* 百叶窗条 */}
      {Array.from({ length: blindCount }).map((_, i) => {
        const isOdd = i % 2 === 1
        return (
          <motion.div
            key={i}
            initial={{ scaleX: 0, x: isOdd ? "50%" : "-50%" }}
            animate={{
              scaleX: [0, 1, 1, 0],
              x: [isOdd ? "50%" : "-50%", "0%", "0%", isOdd ? "-50%" : "50%"],
            }}
            transition={{
              duration: 0.7,
              times: [0, 0.35, 0.65, 1],
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.05,
            }}
            style={{
              position: "absolute",
              top: `${(i / blindCount) * 100}%`,
              left: 0,
              right: 0,
              height: `${100 / blindCount + 0.5}%`,
              background: i % 3 === 0
                ? `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`
                : "rgba(255,255,255,0.2)",
              transformOrigin: isOdd ? "right" : "left",
              ...GPU_STYLES,
            }}
          />
        )
      })}

      {/* 装饰图案 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.5, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0"
        style={GPU_STYLES}
      >
        <PatternOverlay pattern={theme.pattern} color={theme.accent2} />
      </motion.div>

      {/* 横向光带 - 优化：减少数量 */}
      {[0.33, 0.66].map((pos, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 0.6,
            delay: 0.2 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            top: `${pos * 100}%`,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${theme.accent1}, ${theme.accent2}, transparent)`,
            transformOrigin: "left",
            ...GPU_STYLES,
          }}
        />
      ))}

      {/* 路由名称 */}
      <RouteNameDisplay name={routeName} textColor={theme.textColor} />
    </div>
  )
}

// ========================================
// 3. 涟漪 - 作品 (优化：减少涟漪和粒子数量)
// ========================================
function RippleTransition({ theme, routeName }: { theme: Theme; routeName: string }) {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" style={CONTAIN_STYLES} aria-hidden="true">
      {/* 多层涟漪 - 优化：从4减少到3 */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 2.5, 3],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 0.9,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vmax",
            height: "100vmax",
            marginLeft: "-50vmax",
            marginTop: "-50vmax",
            borderRadius: "50%",
            background: i % 2 === 0 ? theme.gradient : `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})`,
            ...GPU_STYLES,
          }}
        />
      ))}

      {/* 中心光晕 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200px",
          height: "200px",
          marginLeft: "-100px",
          marginTop: "-100px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accent1} 0%, transparent 70%)`,
          ...GPU_STYLES,
        }}
      />

      {/* 装饰环 - 优化：从3减少到2 */}
      {[1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1 + i * 0.4, 1.5 + i * 0.4],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 0.8,
            delay: 0.1 + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            marginLeft: `-${100 + i * 50}px`,
            marginTop: `-${100 + i * 50}px`,
            borderRadius: "50%",
            border: `2px dashed ${theme.accent2}`,
            ...GPU_STYLES,
          }}
        />
      ))}

      {/* 散射粒子 - 优化：从16减少到8 */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 360
        const rad = (angle * Math.PI) / 180
        return (
          <motion.div
            key={`particle-${i}`}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x: [0, Math.cos(rad) * 300],
              y: [0, Math.sin(rad) * 300],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "6px",
              height: "6px",
              marginLeft: "-3px",
              marginTop: "-3px",
              borderRadius: "50%",
              background: i % 2 === 0 ? theme.accent1 : theme.accent2,
              ...GPU_STYLES,
            }}
          />
        )
      })}

      {/* 路由名称 */}
      <RouteNameDisplay name={routeName} textColor={theme.textColor} />
    </div>
  )
}

// ========================================
// 4. 快门 - 实验室 (优化：减少叶片数量)
// ========================================
function ShutterTransition({ theme, routeName }: { theme: Theme; routeName: string }) {
  const segments = 6 // 优化：从8减少到6

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" style={CONTAIN_STYLES} aria-hidden="true">
      {/* 渐变背景 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        style={{ background: theme.gradient, ...GPU_STYLES }}
        className="absolute inset-0"
      />

      {/* 快门叶片 */}
      {Array.from({ length: segments }).map((_, i) => {
        const rotation = (360 / segments) * i
        return (
          <motion.div
            key={i}
            initial={{ rotate: rotation, scale: 0, opacity: 0 }}
            animate={{
              rotate: [rotation, rotation + 30, rotation + 30, rotation + 60],
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.75,
              times: [0, 0.35, 0.65, 1],
              ease: [0.34, 1.56, 0.64, 1],
              delay: i * 0.04,
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100vmax",
              height: "100vmax",
              marginLeft: "-50vmax",
              marginTop: "-50vmax",
              background: i % 2 === 0
                ? `linear-gradient(${rotation}deg, ${theme.accent1}80, transparent 50%)`
                : `linear-gradient(${rotation}deg, ${theme.accent2}60, transparent 50%)`,
              transformOrigin: "center",
              ...GPU_STYLES,
            }}
          />
        )
      })}

      {/* 中心装饰 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0] }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100px",
          height: "100px",
          marginLeft: "-50px",
          marginTop: "-50px",
          borderRadius: "50%",
          border: `3px solid ${theme.accent1}`,
          ...GPU_STYLES,
        }}
      />

      {/* 图案叠加 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.4, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0"
        style={GPU_STYLES}
      >
        <PatternOverlay pattern={theme.pattern} color={theme.accent1} />
      </motion.div>

      {/* 路由名称 */}
      <RouteNameDisplay name={routeName} textColor={theme.textColor} />
    </div>
  )
}

// ========================================
// 5. 瀑布 - 关于 (优化：减少列数和飘落元素)
// ========================================
function CascadeTransition({ theme, routeName }: { theme: Theme; routeName: string }) {
  const columns = 5 // 优化：从7减少到5

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" style={CONTAIN_STYLES} aria-hidden="true">
      {/* 渐变背景 */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "0%", "0%", "100%"] }}
        transition={{ duration: 0.8, times: [0, 0.35, 0.65, 1], ease: [0.22, 1, 0.36, 1] }}
        style={{ background: theme.gradient, ...GPU_STYLES }}
        className="absolute inset-0"
      />

      {/* 瀑布列 */}
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "-120%" }}
          animate={{ y: ["-120%", "0%", "0%", "120%"] }}
          transition={{
            duration: 0.75,
            times: [0, 0.35, 0.65, 1],
            ease: [0.34, 1.56, 0.64, 1],
            delay: i * 0.05,
          }}
          style={{
            position: "absolute",
            left: `${(i / columns) * 100}%`,
            top: 0,
            bottom: 0,
            width: `${100 / columns + 1}%`,
            background: i % 2 === 0
              ? `linear-gradient(180deg, ${theme.accent1}90, ${theme.accent2}50)`
              : "rgba(255,255,255,0.15)",
            ...GPU_STYLES,
          }}
        />
      ))}

      {/* 波浪装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0"
        style={GPU_STYLES}
      >
        <PatternOverlay pattern={theme.pattern} color={theme.accent2} />
      </motion.div>

      {/* 飘落元素 - 优化：从20减少到10 */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`drop-${i}`}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: ["-100%", "120%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 0.9,
            delay: 0.05 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            left: `${10 + (i % 5) * 20}%`,
            width: i % 3 === 0 ? "3px" : "2px",
            height: i % 3 === 0 ? "30px" : "20px",
            background: `linear-gradient(180deg, ${theme.accent1}, transparent)`,
            borderRadius: "2px",
            ...GPU_STYLES,
          }}
        />
      ))}

      {/* 路由名称 */}
      <RouteNameDisplay name={routeName} textColor={theme.textColor} />
    </div>
  )
}

// ========================================
// 6. 传送门 - 联系 (优化：减少环和射线数量)
// ========================================
function PortalTransition({ theme, routeName }: { theme: Theme; routeName: string }) {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" style={CONTAIN_STYLES} aria-hidden="true">
      {/* 渐变背景 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        style={{ background: theme.gradient, ...GPU_STYLES }}
        className="absolute inset-0"
      />

      {/* 传送门环 - 优化：从5减少到3 */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1 + i * 0.3, 1.3 + i * 0.3],
            opacity: [0, 0.8 - i * 0.15, 0],
          }}
          transition={{
            duration: 0.9,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            marginLeft: `-${100 + i * 75}px`,
            marginTop: `-${100 + i * 75}px`,
            borderRadius: "50%",
            border: `${3 - i * 0.5}px solid`,
            borderColor: i % 2 === 0 ? theme.accent1 : theme.accent2,
            ...GPU_STYLES,
          }}
        />
      ))}

      {/* 中心光球 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2, 0], opacity: [0, 1, 0.8, 0] }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "80px",
          height: "80px",
          marginLeft: "-40px",
          marginTop: "-40px",
          borderRadius: "50%",
          background: `radial-gradient(circle, white, ${theme.accent1}, transparent)`,
          ...GPU_STYLES,
        }}
      />

      {/* 能量射线 - 优化：从12减少到6 */}
      {[...Array(6)].map((_, i) => {
        const rotation = (360 / 6) * i
        return (
          <motion.div
            key={`ray-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1, 1, 0],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 0.1 + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "2px",
              height: "30vh",
              marginLeft: "-1px",
              background: `linear-gradient(to top, transparent, ${theme.accent1}, ${theme.accent2})`,
              transformOrigin: "bottom center",
              transform: `rotate(${rotation}deg)`,
              ...GPU_STYLES,
            }}
          />
        )
      })}

      {/* 图案 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0.3, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
        className="absolute inset-0"
        style={GPU_STYLES}
      >
        <PatternOverlay pattern={theme.pattern} color={theme.accent2} />
      </motion.div>

      {/* 路由名称 */}
      <RouteNameDisplay name={routeName} textColor={theme.textColor} />
    </div>
  )
}

// ========================================
// 7. 扫入 - 详情页 (优化：减少条纹数量)
// ========================================
function SweepTransition({ theme, routeName }: { theme: Theme; routeName: string }) {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" style={CONTAIN_STYLES} aria-hidden="true">
      {/* 主扫入层 */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "0%", "100%"] }}
        transition={{
          duration: 0.75,
          times: [0, 0.35, 0.65, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ background: theme.gradient, ...GPU_STYLES }}
        className="absolute inset-0"
      />

      {/* 装饰条纹 - 优化：从4减少到2 */}
      {[0.35, 0.65].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: ["-100%", "0%", "0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 0.7,
            times: [0, 0.35, 0.65, 1],
            ease: [0.22, 1, 0.36, 1],
            delay: 0.05 + i * 0.05,
          }}
          style={{
            position: "absolute",
            top: `${pos * 100}%`,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${theme.accent1}, ${theme.accent2}, transparent)`,
            ...GPU_STYLES,
          }}
        />
      ))}

      {/* 图案叠加 */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: ["-100%", "0%", "0%", "100%"], opacity: [0, 0.5, 0.5, 0] }}
        transition={{
          duration: 0.75,
          times: [0, 0.35, 0.65, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
        style={GPU_STYLES}
      >
        <PatternOverlay pattern="lines" color={theme.accent1} />
      </motion.div>

      {/* 高光边缘 */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: ["-100%", "0%", "0%", "100%"] }}
        transition={{
          duration: 0.75,
          times: [0, 0.35, 0.65, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "6px",
          background: `linear-gradient(180deg, ${theme.accent1}, ${theme.accent2}, ${theme.accent1})`,
          ...GPU_STYLES,
        }}
      />

      {/* 路由名称 */}
      <RouteNameDisplay name={routeName} textColor={theme.textColor} />
    </div>
  )
}
