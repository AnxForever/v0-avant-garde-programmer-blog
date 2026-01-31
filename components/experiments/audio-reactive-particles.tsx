"use client"

import { useEffect, useRef, useState } from "react"
import Mic from "lucide-react/dist/esm/icons/mic"
import MicOff from "lucide-react/dist/esm/icons/mic-off"

export function AudioReactiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
    }> = []

    const colors = ["#FF00FF", "#00FF00", "#00FFFF", "#FFFF00", "#FF0000"]

    // 初始化粒子
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      let audioLevel = 0

      // 如果有音频数据，获取音量
      if (analyserRef.current && isListening) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArray)
        audioLevel = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length / 255
      }

      particles.forEach((p) => {
        // 根据音频级别调整粒子行为
        const speedMultiplier = 1 + audioLevel * 3

        p.x += p.vx * speedMultiplier
        p.y += p.vy * speedMultiplier

        // 边界检测
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // 绘制粒子
        const size = p.radius * (1 + audioLevel * 2)
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 20
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      // 清理音频资源（组件卸载时）
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [isListening])

  const toggleAudio = async () => {
    if (!isListening) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream
        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        const source = audioContext.createMediaStreamSource(stream)

        analyser.fftSize = 256
        source.connect(analyser)

        audioContextRef.current = audioContext
        analyserRef.current = analyser
        setIsListening(true)
        setError(null)
      } catch (err) {
        setError("无法访问麦克风，请检查浏览器权限")
        console.error("Microphone access error:", err)
      }
    } else {
      // 停止所有 MediaStream tracks（关闭麦克风指示灯）
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
        analyserRef.current = null
      }
      setIsListening(false)
    }
  }

  return (
    <div className="relative w-full h-full bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />

      <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,0,255,1)]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-black text-xl mb-2">音频反应粒子系统</h3>
            <p className="font-mono text-sm text-gray-400">
              {isListening ? "🎤 正在监听麦克风..." : "点击按钮开始捕捉声音"}
            </p>
            {error && <p className="font-mono text-sm text-accent-red mt-2">{error}</p>}
          </div>
          <button
            onClick={toggleAudio}
            className={`w-16 h-16 border-4 border-white flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] ${
              isListening ? "bg-accent-green" : "bg-accent-pink"
            }`}
          >
            {isListening ? <MicOff className="w-8 h-8 text-black" /> : <Mic className="w-8 h-8 text-black" />}
          </button>
        </div>
      </div>
    </div>
  )
}
