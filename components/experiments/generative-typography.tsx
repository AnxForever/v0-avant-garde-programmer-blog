"use client"

import { useEffect, useRef, useState, useCallback } from "react"

export function GenerativeTypography() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 })

  // RAF 节流优化
  const rafRef = useRef<number | null>(null)
  const pendingMousePos = useRef({ x: 0, y: 0 })

  const text = "前卫编程美学"
  const letters = text.split("")

  // 使用 RAF 节流更新鼠标位置
  const updateMousePos = useCallback(() => {
    setMousePos({ ...pendingMousePos.current })
    rafRef.current = null
  }, [])

  useEffect(() => {
    // 初始化窗口尺寸
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()

      // 存储待处理的鼠标位置
      pendingMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      // 使用 RAF 节流，确保每帧最多更新一次
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateMousePos)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
      window.removeEventListener("resize", handleResize)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updateMousePos])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 背景网格 */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 文字 */}
      <div className="relative flex gap-2 md:gap-4">
        {letters.map((letter, index) => {
          const letterX = (index - letters.length / 2) * 80
          const letterY = 0
          const dx = mousePos.x - windowSize.width / 2 - letterX
          const dy = mousePos.y - windowSize.height / 2 - letterY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 300

          const safeDist = Math.max(distance, 1) // 防止除以零产生 NaN
          const distortionX = distance < maxDistance ? (dx / safeDist) * (maxDistance - distance) * 0.3 : 0
          const distortionY = distance < maxDistance ? (dy / safeDist) * (maxDistance - distance) * 0.3 : 0

          const rotation = distance < maxDistance ? ((maxDistance - distance) / maxDistance) * 15 : 0
          const scale = distance < maxDistance ? 1 + ((maxDistance - distance) / maxDistance) * 0.5 : 1

          const colors = ["#FF00FF", "#00FF00", "#00FFFF", "#FFFF00", "#FF0000"]
          const color = colors[index % colors.length]

          return (
            <div
              key={index}
              className="text-6xl md:text-9xl font-black transition-all duration-100 ease-out"
              style={{
                transform: `translate(${distortionX}px, ${distortionY}px) rotate(${rotation}deg) scale(${scale})`,
                color: color,
                textShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
              }}
            >
              {letter}
            </div>
          )
        })}
      </div>

      {/* 说明 */}
      <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(0,255,255,1)]">
        <h3 className="font-black text-xl mb-2">生成式排版实验</h3>
        <p className="font-mono text-sm text-gray-400">移动鼠标观察文字的形变与扭曲</p>
        <div className="mt-2 font-mono text-xs text-accent-blue">
          MOUSE: [{mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}]
        </div>
      </div>
    </div>
  )
}
