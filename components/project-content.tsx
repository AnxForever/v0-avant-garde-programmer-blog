"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left"
import ExternalLink from "lucide-react/dist/esm/icons/external-link"
import Github from "lucide-react/dist/esm/icons/github"
import Play from "lucide-react/dist/esm/icons/play"

interface Project {
  id: number
  title: string
  client: string
  year: string
  description: string
  tags: string[]
  image: string
  slug: string
  demoUrl?: string
  repoUrl?: string
  isGraduation?: boolean
  status?: string
}

interface ProjectContentProps {
  project: Project
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <main className="min-h-screen bg-white selection:bg-accent-pink selection:text-white">
      <Nav />

      <div className="pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-bold hover:text-accent-pink transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          返回作品列表
        </Link>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[8vw] leading-[0.9] font-black tracking-tighter mb-8 text-black uppercase"
        >
          {project.title}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-100 border-2 border-black relative mb-8 overflow-hidden group">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                [PREVIEW]
              </div>
            </div>

            <div className="prose prose-lg max-w-none font-mono">
              <p className="text-xl font-bold mb-4">{project.description}</p>
              <p>
                这是一个关于 {project.title}{" "}
                的详细案例研究。在实际应用中，这里将包含完整的设计过程、技术挑战和解决方案。
                设计遵循新野兽派美学，具有高对比度元素、大胆的排版和原始的布局结构。
              </p>
              <p>我们使用了 {project.tags.join(", ")} 等技术栈来实现这个项目，确保了最佳的性能和用户体验。</p>
            </div>

            {/* Interactive Demo Section */}
            {project.demoUrl && (
              <div className="mt-12 border-4 border-black p-2 bg-black">
                <div className="bg-white p-4">
                  <h3 className="font-black text-2xl mb-4 flex items-center gap-2">
                    <Play className="w-6 h-6" /> 交互体验 / INTERACTIVE DEMO
                  </h3>
                  <div className="aspect-[16/9] w-full border-2 border-black relative">
                    <iframe
                      src={project.demoUrl}
                      className="w-full h-full"
                      title={`${project.title} Demo`}
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 font-mono text-center">
                    * 这是一个嵌入式预览，为了获得最佳体验，建议点击右侧链接访问完整网站。
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="border-t-4 border-black pt-4">
              <h3 className="font-black text-xl mb-2">客户 / CLIENT</h3>
              <p className="font-mono">{project.client}</p>
            </div>
            <div className="border-t-4 border-black pt-4">
              <h3 className="font-black text-xl mb-2">年份 / YEAR</h3>
              <p className="font-mono">{project.year}</p>
            </div>
            <div className="border-t-4 border-black pt-4">
              <h3 className="font-black text-xl mb-2">角色 / ROLE</h3>
              <p className="font-mono">首席开发, UI/UX 设计</p>
            </div>
            <div className="border-t-4 border-black pt-4">
              <h3 className="font-black text-xl mb-2">技术栈 / TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-black text-white px-2 py-1 text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.demoUrl || project.repoUrl) && (
              <div className="border-t-4 border-black pt-4">
                <h3 className="font-black text-xl mb-2">链接 / LINKS</h3>
                <div className="flex flex-col gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-accent-pink transition-colors font-mono font-bold"
                    >
                      <ExternalLink className="w-4 h-4" /> 访问网站 / LIVE DEMO
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-accent-pink transition-colors font-mono font-bold"
                    >
                      <Github className="w-4 h-4" /> 源代码 / SOURCE CODE
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
