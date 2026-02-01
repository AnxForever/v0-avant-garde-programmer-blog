"use client"

import type React from "react"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { useState } from "react"

interface FormErrors {
  name?: string
  email?: string
  message?: string
  general?: string
}

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 清除该字段的错误
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    setErrors({})

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setFormStatus("success")
        setFormData({ name: "", email: "", message: "", website: "" })
      } else {
        setFormStatus("error")
        // 处理验证错误
        if (data.errors && Array.isArray(data.errors)) {
          setErrors({ general: data.errors.join(", ") })
        } else {
          setErrors({ general: "发送失败，请稍后重试" })
        }
      }
    } catch {
      setFormStatus("error")
      setErrors({ general: "网络错误，请检查您的连接" })
    }
  }

  const resetForm = () => {
    setFormStatus("idle")
    setErrors({})
  }

  return (
    <main className="min-h-screen bg-white selection:bg-accent-pink selection:text-white">
      <Nav />

      <div className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20">
          {/* Left Column: Text */}
          <div>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-[12vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter mb-6 md:mb-12 text-black"
            >
              LET&apos;S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-pink">
                COLLIDE
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-2xl font-mono max-w-md mb-6 md:mb-12"
            >
              Have a crazy idea? A project that defies logic? Or just want to argue about tabs vs spaces? Send a signal.
            </motion.p>

            <div className="flex flex-col gap-3 md:gap-4 font-mono text-base md:text-lg">
              <a href="mailto:anxforever@qq.com" className="hover:text-accent-pink transition-colors">
                anxforever@qq.com
              </a>
              <a
                href="https://github.com/AnxForever"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-green transition-colors"
              >
                github.com/AnxForever
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 p-6 md:p-12 border-2 border-black relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-black" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-black" />

            {formStatus === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 md:py-20">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">🚀</div>
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-2">信号已接收</h3>
                <p className="font-mono text-gray-600 text-sm md:text-base">我会以光速回复你。</p>
                <button
                  onClick={resetForm}
                  className="mt-6 md:mt-8 text-sm font-bold underline hover:text-accent-pink"
                >
                  发送另一条
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-6 md:gap-8" onSubmit={handleSubmit}>
                {/* Honeypot 字段 - 对用户不可见，机器人会填写 */}
                <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                {/* 显示通用错误 */}
                {errors.general && (
                  <div className="bg-red-50 border-2 border-red-500 p-4 text-red-600 font-mono text-sm">
                    {errors.general}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono font-bold uppercase text-xs md:text-sm">身份 / IDENTITY</label>
                  <input
                    id="name"
                    name="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="你的名字…"
                    autoComplete="name"
                    className="bg-transparent border-b-2 border-gray-300 focus:border-black outline-none py-3 md:py-4 text-base md:text-xl font-bold placeholder:text-gray-300 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono font-bold uppercase text-xs md:text-sm">坐标 / COORDINATES</label>
                  <input
                    id="email"
                    name="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="你的邮箱…"
                    autoComplete="email"
                    spellCheck={false}
                    className="bg-transparent border-b-2 border-gray-300 focus:border-black outline-none py-3 md:py-4 text-base md:text-xl font-bold placeholder:text-gray-300 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono font-bold uppercase text-xs md:text-sm">传输内容 / TRANSMISSION</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="告诉我一切…"
                    autoComplete="off"
                    className="bg-transparent border-b-2 border-gray-300 focus:border-black outline-none py-3 md:py-4 text-base md:text-xl font-bold placeholder:text-gray-300 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="bg-black text-white py-4 md:py-6 px-6 md:px-8 font-bold text-base md:text-xl uppercase tracking-widest hover:bg-accent-pink transition-colors mt-2 md:mt-4 group flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {formStatus === "submitting" ? "传输中..." : formStatus === "error" ? "重新发送" : "发送信息"}
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform">-&gt;</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
