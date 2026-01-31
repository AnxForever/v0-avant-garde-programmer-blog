"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import {
  getTransitionType,
  getRouteColors,
  type TransitionType,
} from "./transitions/config"
import {
  geometricWipeVariants,
  diagonalRevealVariants,
  splitHorizontalVariants,
  slideStackVariants,
} from "./transitions/variants"

interface OverlayColors {
  overlay: string
  accent: string
}

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionType, setTransitionType] = useState<TransitionType>("geometric-wipe")
  const [colors, setColors] = useState<OverlayColors>({ overlay: "#1a1a1a", accent: "rgba(255, 0, 110, 0.15)" })
  const prefersReducedMotion = useReducedMotion()
  const isFirstMount = useRef(true)

  useEffect(() => {
    // 首次加载不触发转场
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    if (prefersReducedMotion) return

    // 根据路由确定转场类型和颜色
    setTransitionType(getTransitionType(pathname))
    setColors(getRouteColors(pathname))
    setIsTransitioning(true)

    // 根据转场类型调整持续时间
    const duration = transitionType === "perspective-zoom" ? 900 : 750
    const timer = setTimeout(() => setIsTransitioning(false), duration)
    return () => clearTimeout(timer)
  }, [pathname, prefersReducedMotion, transitionType])

  if (prefersReducedMotion) return null

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <TransitionLayers
          key={pathname}
          type={transitionType}
          colors={colors}
        />
      )}
    </AnimatePresence>
  )
}

interface TransitionLayersProps {
  type: TransitionType
  colors: OverlayColors
}

function TransitionLayers({ type, colors }: TransitionLayersProps) {
  const baseStyles = "fixed inset-0 z-[60] pointer-events-none"
  const containStyles = { contain: "layout paint" as const }

  switch (type) {
    case "geometric-wipe":
      return (
        <>
          {/* 底层 - 深色 */}
          <motion.div
            variants={geometricWipeVariants.layer1}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ backgroundColor: colors.overlay, willChange: "clip-path", ...containStyles }}
            className={baseStyles}
            aria-hidden="true"
          />
          {/* 顶层 - 强调色叠加 */}
          <motion.div
            variants={geometricWipeVariants.layer2}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ backgroundColor: colors.accent, willChange: "clip-path", ...containStyles }}
            className={`${baseStyles} z-[61]`}
            aria-hidden="true"
          />
        </>
      )

    case "diagonal-reveal":
      return (
        <>
          <motion.div
            variants={diagonalRevealVariants.overlay}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ backgroundColor: colors.overlay, willChange: "clip-path", ...containStyles }}
            className={baseStyles}
            aria-hidden="true"
          />
          <motion.div
            variants={diagonalRevealVariants.overlay}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundColor: colors.accent,
              willChange: "clip-path",
              ...containStyles,
            }}
            className={`${baseStyles} z-[61]`}
            transition={{ delay: 0.06 }}
            aria-hidden="true"
          />
        </>
      )

    case "split-horizontal":
      return (
        <>
          {/* 上半部分 */}
          <motion.div
            variants={splitHorizontalVariants.top}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundColor: colors.overlay,
              willChange: "transform",
              ...containStyles,
              height: "50%",
              top: 0,
            }}
            className={`${baseStyles} !bottom-auto`}
            aria-hidden="true"
          />
          {/* 下半部分 */}
          <motion.div
            variants={splitHorizontalVariants.bottom}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundColor: colors.accent,
              willChange: "transform",
              ...containStyles,
              height: "50%",
              bottom: 0,
            }}
            className={`${baseStyles} !top-auto`}
            aria-hidden="true"
          />
        </>
      )

    case "slide-stack":
      return (
        <motion.div
          variants={slideStackVariants.overlay}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ backgroundColor: colors.overlay, willChange: "transform", ...containStyles }}
          className={baseStyles}
          aria-hidden="true"
        />
      )

    case "perspective-zoom":
      // 透视缩放不需要遮罩，内容自身带 3D 变换
      return (
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: colors.overlay, ...containStyles }}
          className={baseStyles}
          aria-hidden="true"
        />
      )

    default:
      return null
  }
}
