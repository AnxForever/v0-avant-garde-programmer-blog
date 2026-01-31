"use client"

import { motion, AnimatePresence } from "framer-motion"
import type React from "react"
import { useContext, useRef, useEffect } from "react"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useReducedMotion } from "@/lib/use-reduced-motion"
import { getTransitionType } from "@/components/transitions/config"
import { getContentVariants } from "@/components/transitions/variants"

/**
 * 保存上一个值的 hook
 */
function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T | undefined>(undefined)
  useEffect(() => {
    prevValue.current = value
  })
  return prevValue.current
}

/**
 * FrozenRouter - 冻结路由上下文以支持退出动画
 *
 * Next.js App Router 的问题：组件卸载时没有退出动画
 * 解决方案：在路由变化时，暂时保持旧的路由上下文，
 * 让旧组件有时间播放退出动画
 */
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const prevContext = usePreviousValue(context)
  const segment = useSelectedLayoutSegment()
  const prevSegment = usePreviousValue(segment)

  // 检测路由是否发生变化
  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const pathname = usePathname()
  const segment = useSelectedLayoutSegment()

  // 尊重用户的减少动画偏好
  if (prefersReducedMotion) {
    return <div>{children}</div>
  }

  // 根据路由获取对应的动画变体
  const transitionType = getTransitionType(pathname)
  const variants = getContentVariants(transitionType)

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment || pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        style={{
          willChange: "transform, opacity",
          transformOrigin: "50% 0%",
        }}
        onAnimationComplete={() => {
          // 动画完成后移除 will-change 优化
          const el = document.querySelector("[data-page-content]")
          if (el instanceof HTMLElement) {
            el.style.willChange = "auto"
          }
        }}
        data-page-content
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}
