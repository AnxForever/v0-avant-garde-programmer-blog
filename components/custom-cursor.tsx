"use client"

import { useEffect, useRef, useCallback } from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const isIdleRef = useRef(false)
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // 停止动画循环（节省电量）
  const stopAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    isIdleRef.current = true
  }, [])

  // 使用 RAF 进行平滑动画更新，避免 setState 导致的重渲染
  const animate = useCallback(() => {
    if (isIdleRef.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // 平滑插值
    const ease = 0.15
    positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease
    positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease

    const { x, y } = positionRef.current
    const scale = isHoveringRef.current ? 2.5 : 1
    const ringScale = isHoveringRef.current ? 1.5 : 1

    dot.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0) scale(${scale})`
    ring.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0) scale(${ringScale})`

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  // 启动动画循环
  const startAnimation = useCallback(() => {
    if (!isIdleRef.current) return
    isIdleRef.current = false
    rafRef.current = requestAnimationFrame(animate)
  }, [animate])

  useEffect(() => {
    // 尊重用户的减少动画偏好
    if (prefersReducedMotion) return

    // 检测触摸设备
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    if (isTouchDevice) return

    const updateMousePosition = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }

      // 鼠标移动时恢复动画
      if (isIdleRef.current) {
        startAnimation()
      }

      // 重置闲置定时器（1秒后暂停动画）
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
      idleTimeoutRef.current = setTimeout(stopAnimation, 1000)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      isHoveringRef.current = target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a, button") !== null
    }

    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })

    // 启动动画循环
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
      }
    }
  }, [animate, prefersReducedMotion, startAnimation, stopAnimation])

  // 尊重用户偏好或触摸设备时不显示自定义光标
  if (prefersReducedMotion) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform hidden md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform hidden md:block"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
        aria-hidden="true"
      />
    </>
  )
}
