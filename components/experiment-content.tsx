"use client"

import { Nav } from "@/components/nav"
import { motion } from "framer-motion"
import Link from "next/link"
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left"
import { AudioReactiveParticles } from "@/components/experiments/audio-reactive-particles"
import { GenerativeTypography } from "@/components/experiments/generative-typography"
import { PhysicsBasedLayout } from "@/components/experiments/physics-based-layout"
import { StyleTransfer } from "@/components/experiments/style-transfer"
import { AITextDetector } from "@/components/experiments/ai-text-detector"

// 注意：不包含 icon 属性，因为 Lucide 图标是函数，无法从服务端传递
interface Experiment {
  id: number
  title: string
  description: string
  tags: string[]
  color: string
  slug: string
  isGraduation?: boolean
}

interface ExperimentContentProps {
  experiment: Experiment
}

export function ExperimentContent({ experiment }: ExperimentContentProps) {
  const renderExperiment = () => {
    switch (experiment.slug) {
      case "audio-reactive-particles":
        return <AudioReactiveParticles />
      case "generative-typography":
        return <GenerativeTypography />
      case "physics-based-layout":
        return <PhysicsBasedLayout />
      case "style-transfer":
        return <StyleTransfer />
      case "ai-text-detector":
        return <AITextDetector />
      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-24 h-24 border-4 border-accent-blue border-t-transparent rounded-full mx-auto mb-6"
              />
              <h2 className="text-2xl font-black mb-2">功能开发中...</h2>
              <p className="font-mono text-gray-400 text-sm">即将推出</p>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent-green selection:text-black">
      <Nav />

      <div className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto h-screen flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 font-bold hover:text-accent-green transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            退出实验室
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="font-black text-2xl">{experiment.title}</h1>
            <div className="font-mono text-accent-pink text-sm">ID: {experiment.id}</div>
          </div>
        </div>

        <div className="flex-1 border-4 border-white relative bg-gray-900 overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          {renderExperiment()}
        </div>
      </div>
    </main>
  )
}

export function ExperimentNotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <p className="font-mono text-accent-pink mb-8">实验不存在</p>
        <Link href="/lab" className="font-bold hover:text-accent-green transition-colors">
          返回实验室
        </Link>
      </div>
    </main>
  )
}
