"use client"

import dynamic from "next/dynamic"
import { Nav } from "@/components/nav"
import { motion } from "framer-motion"
import Link from "next/link"
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left"

// 动态导入实验组件，避免一次性加载所有重型代码
const AudioReactiveParticles = dynamic(
  () => import("@/components/experiments/audio-reactive-particles").then((m) => m.AudioReactiveParticles),
  {
    loading: () => <ExperimentLoader />,
    ssr: false,
  }
)

const GenerativeTypography = dynamic(
  () => import("@/components/experiments/generative-typography").then((m) => m.GenerativeTypography),
  {
    loading: () => <ExperimentLoader />,
    ssr: false,
  }
)

const PhysicsBasedLayout = dynamic(
  () => import("@/components/experiments/physics-based-layout").then((m) => m.PhysicsBasedLayout),
  {
    loading: () => <ExperimentLoader />,
    ssr: false,
  }
)

const StyleTransfer = dynamic(
  () => import("@/components/experiments/style-transfer").then((m) => m.StyleTransfer),
  {
    loading: () => <ExperimentLoader />,
    ssr: false,
  }
)

const AITextDetector = dynamic(
  () => import("@/components/experiments/ai-text-detector").then((m) => m.AITextDetector),
  {
    loading: () => <ExperimentLoader />,
    ssr: false,
  }
)

// 加载状态组件
function ExperimentLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-accent-green border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="font-mono text-gray-400 text-sm">加载实验中...</p>
      </div>
    </div>
  )
}

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
                className="w-16 h-16 md:w-24 md:h-24 border-2 md:border-4 border-accent-blue border-t-transparent rounded-full mx-auto mb-4 md:mb-6"
              />
              <h2 className="text-xl md:text-2xl font-black mb-2">功能开发中...</h2>
              <p className="font-mono text-gray-400 text-xs md:text-sm">即将推出</p>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent-green selection:text-black">
      <Nav />

      <div className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto min-h-screen md:h-screen flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-8 gap-3 md:gap-0">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 font-bold hover:text-accent-green transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            退出实验室
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <h1 className="font-black text-lg md:text-2xl">{experiment.title}</h1>
            <div className="font-mono text-accent-pink text-xs md:text-sm">ID: {experiment.id}</div>
          </div>
        </div>

        <div className="flex-1 border-2 md:border-4 border-white relative bg-gray-900 overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] min-h-[60vh] md:min-h-0">
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
