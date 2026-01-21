"use client"

import { useEffect, useRef, useState } from "react"
import RotateCcw from "lucide-react/dist/esm/icons/rotate-ccw"
import type Matter from "matter-js"

export function PhysicsBasedLayout() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [, setTick] = useState(0)
  const engineRef = useRef<Matter.Engine | null>(null)
  const renderRef = useRef<Matter.Render | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const bodiesRef = useRef<Matter.Body[]>([])

  useEffect(() => {
    const loadMatter = async () => {
      const Matter = (await import("matter-js")).default

      const canvas = canvasRef.current
      if (!canvas) return

      const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Runner } = Matter

      const engine = Engine.create({
        gravity: { x: 0, y: 1 },
      })
      engineRef.current = engine

      const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          width: canvas.offsetWidth,
          height: canvas.offsetHeight,
          wireframes: false,
          background: "#000000",
        },
      })
      renderRef.current = render

      // 创建边界
      const walls = [
        Bodies.rectangle(canvas.offsetWidth / 2, 0, canvas.offsetWidth, 20, {
          isStatic: true,
          render: { fillStyle: "#FFFFFF" },
        }),
        Bodies.rectangle(canvas.offsetWidth / 2, canvas.offsetHeight, canvas.offsetWidth, 20, {
          isStatic: true,
          render: { fillStyle: "#FFFFFF" },
        }),
        Bodies.rectangle(0, canvas.offsetHeight / 2, 20, canvas.offsetHeight, {
          isStatic: true,
          render: { fillStyle: "#FFFFFF" },
        }),
        Bodies.rectangle(canvas.offsetWidth, canvas.offsetHeight / 2, 20, canvas.offsetHeight, {
          isStatic: true,
          render: { fillStyle: "#FFFFFF" },
        }),
      ]

      World.add(engine.world, walls)

      // 创建彩色方块
      const colors = ["#FF00FF", "#00FF00", "#00FFFF", "#FFFF00", "#FF0000"]
      const boxes = []

      for (let i = 0; i < 15; i++) {
        const size = Math.random() * 40 + 30
        const box = Bodies.rectangle(
          Math.random() * (canvas.offsetWidth - 100) + 50,
          Math.random() * 200 + 50,
          size,
          size,
          {
            restitution: 0.8,
            friction: 0.001,
            render: {
              fillStyle: colors[i % colors.length],
            },
          },
        )
        boxes.push(box)
      }

      bodiesRef.current = boxes
      World.add(engine.world, boxes)

      // 添加鼠标控制
      const mouse = Mouse.create(render.canvas)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      })

      World.add(engine.world, mouseConstraint)

      // 启动渲染器和引擎
      Render.run(render)
      const runner = Runner.create()
      runnerRef.current = runner
      Runner.run(runner, engine)

      return () => {
        Render.stop(render)
        Runner.stop(runner)
        World.clear(engine.world, false)
        Engine.clear(engine)
      }
    }

    loadMatter()
  }, [])

  const reset = async () => {
    const canvas = canvasRef.current
    if (!canvas || !engineRef.current) return

    const Matter = (await import("matter-js")).default
    const { World, Bodies } = Matter

    // 移除旧方块
    bodiesRef.current.forEach((body) => {
      World.remove(engineRef.current.world, body)
    })

    // 创建新方块
    const colors = ["#FF00FF", "#00FF00", "#00FFFF", "#FFFF00", "#FF0000"]
    const boxes = []

    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 40 + 30
      const box = Bodies.rectangle(
        Math.random() * (canvas.offsetWidth - 100) + 50,
        Math.random() * 200 + 50,
        size,
        size,
        {
          restitution: 0.8,
          friction: 0.001,
          render: {
            fillStyle: colors[i % colors.length],
          },
        },
      )
      boxes.push(box)
    }

    bodiesRef.current = boxes
    World.add(engineRef.current.world, boxes)
    setTick((t) => t + 1)
  }

  return (
    <div className="relative w-full h-full bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />

      <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,255,0,1)]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-black text-xl mb-2">物理布局引擎</h3>
            <p className="font-mono text-sm text-gray-400">拖拽方块，看它们碰撞与弹跳</p>
          </div>
          <button
            onClick={reset}
            className="w-16 h-16 bg-accent-yellow border-4 border-white flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
          >
            <RotateCcw className="w-8 h-8 text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}
