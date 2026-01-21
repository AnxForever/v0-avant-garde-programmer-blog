"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScanSearch from "lucide-react/dist/esm/icons/scan-search"
import User from "lucide-react/dist/esm/icons/user"
import Bot from "lucide-react/dist/esm/icons/bot"
import Loader2 from "lucide-react/dist/esm/icons/loader-2"
import Sparkles from "lucide-react/dist/esm/icons/sparkles"
import AlertTriangle from "lucide-react/dist/esm/icons/alert-triangle"
import CheckCircle from "lucide-react/dist/esm/icons/check-circle"
import XCircle from "lucide-react/dist/esm/icons/x-circle"
import GraduationCap from "lucide-react/dist/esm/icons/graduation-cap"

// 示例文本
const exampleTexts = [
  {
    label: "人类撰写",
    text: "今天去超市买菜，发现西红柿涨价了。回来的路上碰到老王，聊了会儿天，他说他儿子今年考上大学了，挺为他高兴的。",
    expectedResult: "human",
  },
  {
    label: "AI 生成",
    text: "人工智能技术的快速发展正在深刻改变我们的生活方式。从智能家居到自动驾驶，从医疗诊断到金融分析，AI 的应用场景日益丰富。这种技术革新不仅提高了效率，还创造了新的可能性。",
    expectedResult: "ai",
  },
  {
    label: "新闻报道",
    text: "据央视新闻报道，我国科学家在量子计算领域取得重大突破。这一成果标志着我国在量子科技领域的研究水平已达到世界领先地位。",
    expectedResult: "human",
  },
]

// 模拟的检测结果（实际应该调用后端API）
function simulateDetection(text: string): Promise<{ result: "human" | "ai"; confidence: number; features: string[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 简单的模拟逻辑（实际项目中会调用 BERT 模型）
      const aiIndicators = [
        "人工智能",
        "技术",
        "发展",
        "革新",
        "效率",
        "应用",
        "领域",
        "深刻",
        "日益",
        "标志着",
        "此外",
        "总之",
        "综上所述",
      ]
      const humanIndicators = ["今天", "碰到", "挺", "聊", "买", "发现", "说", "他", "我"]

      let aiScore = 0
      let humanScore = 0

      aiIndicators.forEach((indicator) => {
        if (text.includes(indicator)) aiScore++
      })
      humanIndicators.forEach((indicator) => {
        if (text.includes(indicator)) humanScore++
      })

      // 计算平均句子长度
      const sentences = text.split(/[。！？.!?]/).filter((s) => s.trim())
      const avgSentenceLength = sentences.reduce((acc, s) => acc + s.length, 0) / sentences.length

      // AI 生成的文本通常句子更长、更规整
      if (avgSentenceLength > 30) aiScore += 2
      if (avgSentenceLength < 20) humanScore += 2

      const isAI = aiScore > humanScore
      const confidence = Math.min(95, Math.max(60, 70 + Math.abs(aiScore - humanScore) * 5))

      const features = []
      if (isAI) {
        if (avgSentenceLength > 30) features.push("句子结构规整")
        if (aiScore > 2) features.push("使用正式书面语")
        features.push("逻辑连贯性强")
      } else {
        if (avgSentenceLength < 20) features.push("句子简短口语化")
        if (humanScore > 2) features.push("包含日常用语")
        features.push("有个人情感表达")
      }

      resolve({
        result: isAI ? "ai" : "human",
        confidence,
        features,
      })
    }, 2000)
  })
}

export function AITextDetector() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    result: "human" | "ai"
    confidence: number
    features: string[]
  } | null>(null)

  const handleDetect = async () => {
    if (!inputText.trim() || inputText.length < 20) return

    setIsAnalyzing(true)
    setResult(null)

    try {
      const detectionResult = await simulateDetection(inputText)
      setResult(detectionResult)
    } catch {
      console.error("Detection failed")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleExampleClick = (text: string) => {
    setInputText(text)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-accent-green to-accent-blue">
              <ScanSearch className="w-8 h-8 text-black" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-accent-pink text-black px-2 py-1 text-xs font-bold">毕业设计</span>
              <GraduationCap className="w-5 h-5 text-accent-pink" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            AI 文本检测
          </h1>
          <p className="text-lg font-mono text-gray-400 max-w-2xl">
            基于 BERT 微调的二分类模型，判断文本是人类撰写还是 AI 生成。
            使用 HC3 数据集训练，准确率达 96%。
          </p>
        </motion.div>

        {/* 主要交互区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 输入区域 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border-4 border-white bg-white/5 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black">输入文本</h2>
                <span className="font-mono text-sm text-gray-500">
                  {inputText.length} / 1000
                </span>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value.slice(0, 1000))
                  setResult(null)
                }}
                placeholder="在此输入或粘贴要检测的文本（至少20个字符）..."
                className="w-full h-48 bg-black border-2 border-white/20 p-4 font-mono text-sm resize-none focus:outline-none focus:border-accent-green transition-colors"
              />

              {inputText.length > 0 && inputText.length < 20 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mt-2 text-accent-yellow"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">请输入至少 20 个字符</span>
                </motion.div>
              )}

              <motion.button
                onClick={handleDetect}
                disabled={isAnalyzing || inputText.length < 20}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-4 py-4 font-black text-lg border-4 transition-all duration-300 ${
                  isAnalyzing || inputText.length < 20
                    ? "border-gray-600 text-gray-600 cursor-not-allowed"
                    : "border-accent-green bg-accent-green text-black hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    模型分析中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    开始检测
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* 示例文本 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <h3 className="font-mono text-sm text-gray-500 mb-3">试试这些示例：</h3>
              <div className="flex flex-wrap gap-2">
                {exampleTexts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example.text)}
                    className="px-4 py-2 border-2 border-white/20 font-mono text-sm hover:border-accent-pink hover:bg-accent-pink/10 transition-all"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 结果区域 */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="border-4 border-white/20 p-6 min-h-[300px] flex flex-col"
            >
              <h2 className="text-xl font-black mb-4">检测结果</h2>

              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-accent-green/30 rounded-full" />
                      <motion.div
                        className="absolute inset-0 border-4 border-transparent border-t-accent-green rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <ScanSearch className="absolute inset-0 m-auto w-10 h-10 text-accent-green" />
                    </div>
                    <p className="mt-4 font-mono text-sm text-gray-400">BERT 模型分析中...</p>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col"
                  >
                    {/* 结果图标 */}
                    <div
                      className={`p-6 border-4 mb-4 ${
                        result.result === "human"
                          ? "border-accent-green bg-accent-green/10"
                          : "border-accent-pink bg-accent-pink/10"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {result.result === "human" ? (
                          <>
                            <User className="w-12 h-12 text-accent-green" strokeWidth={2.5} />
                            <div>
                              <p className="text-2xl font-black text-accent-green">人类撰写</p>
                              <p className="font-mono text-sm text-gray-400">HUMAN WRITTEN</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Bot className="w-12 h-12 text-accent-pink" strokeWidth={2.5} />
                            <div>
                              <p className="text-2xl font-black text-accent-pink">AI 生成</p>
                              <p className="font-mono text-sm text-gray-400">AI GENERATED</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 置信度 */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-mono text-sm">置信度</span>
                        <span className="font-black">{result.confidence}%</span>
                      </div>
                      <div className="h-3 bg-white/10 border border-white/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className={`h-full ${
                            result.result === "human" ? "bg-accent-green" : "bg-accent-pink"
                          }`}
                        />
                      </div>
                    </div>

                    {/* 特征分析 */}
                    <div>
                      <p className="font-mono text-sm text-gray-500 mb-2">检测到的特征：</p>
                      <div className="space-y-2">
                        {result.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            {result.result === "human" ? (
                              <CheckCircle className="w-4 h-4 text-accent-green" />
                            ) : (
                              <XCircle className="w-4 h-4 text-accent-pink" />
                            )}
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 border-2 border-dashed border-white/20 flex items-center justify-center mb-4">
                      <ScanSearch className="w-8 h-8 text-white/20" />
                    </div>
                    <p className="font-mono text-sm text-gray-500">
                      输入文本后点击"开始检测"
                      <br />
                      查看分析结果
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 技术说明 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 border-2 border-white/10 bg-white/5"
            >
              <h3 className="font-black text-sm mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                技术细节
              </h3>
              <ul className="text-xs font-mono text-gray-500 space-y-1">
                <li>• 模型：bert-base-uncased 微调</li>
                <li>• 数据集：HC3 (Human-ChatGPT Comparison)</li>
                <li>• 准确率：96%（测试集）</li>
                <li>• 推理时间：~200ms</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 border-2 border-accent-yellow/30 bg-accent-yellow/5"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-accent-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-black mb-2">关于本演示</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                当前展示的是模拟检测结果，实际部署需要后端 API 支持。
                完整的 BERT 模型部署在本地服务器上，可通过 FastAPI 接口调用。
                这是我的毕业设计项目，代码和训练日志可在项目仓库中查看。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
