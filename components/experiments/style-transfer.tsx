"use client"

import { useCallback, useState } from "react"
import Upload from "lucide-react/dist/esm/icons/upload"
import Sparkles from "lucide-react/dist/esm/icons/sparkles"
import RotateCw from "lucide-react/dist/esm/icons/rotate-cw"
import Download from "lucide-react/dist/esm/icons/download"
import X from "lucide-react/dist/esm/icons/x"
import { motion, AnimatePresence } from "framer-motion"

type ImageSlot = {
  preview: string | null
  name: string
}

const DEMO_STYLES = [
  {
    name: "新海诚动漫风格",
    thumbnail: "/glitch-art-digital.jpg",
    description: "日系动漫风格，鲜艳色彩和梦幻光影",
  },
  {
    name: "梵高星空",
    thumbnail: "/neon-cyberpunk-interface.jpg",
    description: "后印象派，漩涡笔触和浓烈色彩",
  },
  {
    name: "赛博朋克",
    thumbnail: "/brutalist-architecture-website.jpg",
    description: "霓虹灯效果，未来主义科技感",
  },
]

export function StyleTransfer() {
  const [contentImage, setContentImage] = useState<ImageSlot>({ preview: null, name: "" })
  const [styleImage, setStyleImage] = useState<ImageSlot>({ preview: null, name: "" })
  const [selectedStyle, setSelectedStyle] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleImageUpload = useCallback((file: File, type: "content" | "style") => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      if (type === "content") {
        setContentImage({ preview, name: file.name })
      } else {
        setStyleImage({ preview, name: file.name })
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, type: "content" | "style") => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file, type)
      }
    },
    [handleImageUpload],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "content" | "style") => {
      const file = e.target.files?.[0]
      if (file) {
        handleImageUpload(file, type)
      }
    },
    [handleImageUpload],
  )

  const processStyleTransfer = useCallback(() => {
    if (!contentImage.preview) return

    setIsProcessing(true)
    setProgress(0)
    setResult(null)

    // 模拟处理进度
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          // 使用内容图片作为"处理结果"（演示用）
          setResult(contentImage.preview)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }, [contentImage])

  const reset = useCallback(() => {
    setContentImage({ preview: null, name: "" })
    setStyleImage({ preview: null, name: "" })
    setResult(null)
    setProgress(0)
    setIsProcessing(false)
  }, [])

  return (
    <div className="w-full h-full bg-black text-white p-4 md:p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* 标题区域 */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">AI 风格迁移实验</h2>
          <p className="font-mono text-accent-green text-sm md:text-base">
            上传你的照片，选择艺术风格，让 AI 创造魔法 ✨
          </p>
        </div>

        {/* 上传区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* 内容图片上传 */}
          <div className="border-4 border-white p-4 bg-white/5">
            <label className="block font-bold mb-3 text-accent-pink text-sm tracking-wider">
              1. 上传内容图片
            </label>
            <div
              onDrop={(e) => handleDrop(e, "content")}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-white/30 hover:border-accent-pink transition-colors aspect-square flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden"
            >
              {contentImage.preview ? (
                <>
                  <img
                    src={contentImage.preview}
                    alt="Content"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setContentImage({ preview: null, name: "" })
                    }}
                    className="absolute top-2 right-2 bg-black/80 hover:bg-accent-pink text-white p-2 border-2 border-white z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <Upload className="w-12 h-12 mb-4 group-hover:text-accent-pink transition-colors" />
                  <span className="font-mono text-sm text-center px-4">
                    拖拽图片到这里
                    <br />
                    或点击上传
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, "content")}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* 风格选择 */}
          <div className="border-4 border-white p-4 bg-white/5">
            <label className="block font-bold mb-3 text-accent-blue text-sm tracking-wider">
              2. 选择艺术风格
            </label>
            <div className="grid grid-cols-1 gap-3 h-[calc(100%-2rem)]">
              {DEMO_STYLES.map((style, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedStyle(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border-2 p-3 text-left transition-all ${
                    selectedStyle === index
                      ? "border-accent-blue bg-accent-blue/20"
                      : "border-white/30 hover:border-accent-blue/50"
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{style.name}</div>
                  <div className="font-mono text-xs text-gray-400">{style.description}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* 处理按钮 */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={processStyleTransfer}
            disabled={!contentImage.preview || isProcessing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 font-black text-lg border-4 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] ${
              !contentImage.preview || isProcessing
                ? "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-accent-green text-black border-white hover:bg-accent-yellow"
            }`}
          >
            <Sparkles className="w-5 h-5 inline mr-2" />
            {isProcessing ? "处理中..." : "开始转换"}
          </motion.button>

          {(contentImage.preview || result) && (
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 font-black text-lg bg-black border-4 border-white hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              <RotateCw className="w-5 h-5 inline mr-2" />
              重置
            </motion.button>
          )}
        </div>

        {/* 进度条 */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 border-4 border-accent-pink p-4"
            >
              <div className="flex justify-between mb-2 font-mono text-sm">
                <span>神经网络正在工作...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-4 bg-black border-2 border-white overflow-hidden">
                <motion.div
                  className="h-full bg-accent-pink"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="font-mono text-xs text-accent-green mt-2">
                {progress < 30 && "正在提取内容特征..."}
                {progress >= 30 && progress < 60 && "正在分析风格模式..."}
                {progress >= 60 && progress < 90 && "正在合成图像..."}
                {progress >= 90 && "正在优化细节..."}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 结果展示 */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="border-4 border-accent-green p-4 bg-white/5"
            >
              <div className="flex justify-between items-center mb-4">
                <label className="block font-bold text-accent-green text-sm tracking-wider">
                  ✨ 转换完成
                </label>
                <button className="px-4 py-2 bg-accent-green text-black font-bold border-2 border-white hover:bg-accent-yellow transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  下载结果
                </button>
              </div>
              <div className="border-2 border-white aspect-video overflow-hidden bg-black">
                <img src={result} alt="Result" className="w-full h-full object-contain" />
              </div>
              <div className="mt-4 font-mono text-xs text-gray-400 text-center">
                这是一个前端演示。真实的风格迁移需要后端 PyTorch 模型支持。
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 技术说明 */}
        <div className="mt-8 border-2 border-white/20 p-6 bg-white/5">
          <h3 className="font-bold text-xl mb-4 text-accent-yellow">技术原理</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="border border-white/20 p-4">
              <div className="text-accent-pink font-bold mb-2">1. 特征提取</div>
              <p className="text-gray-400">使用 VGG-19 卷积神经网络提取内容和风格特征</p>
            </div>
            <div className="border border-white/20 p-4">
              <div className="text-accent-blue font-bold mb-2">2. 损失计算</div>
              <p className="text-gray-400">计算内容损失和风格损失的加权组合</p>
            </div>
            <div className="border border-white/20 p-4">
              <div className="text-accent-green font-bold mb-2">3. 迭代优化</div>
              <p className="text-gray-400">通过梯度下降逐步优化生成图像</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
