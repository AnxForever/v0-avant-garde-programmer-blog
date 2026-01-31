import { Metadata } from "next"
import { notFound } from "next/navigation"
import { experiments } from "@/lib/data"
import { ExperimentContent, ExperimentNotFound } from "@/components/experiment-content"
import { BASE_URL } from "@/lib/url"

interface PageProps {
  params: Promise<{ slug: string }>
}

// 生成静态参数，用于构建时预渲染所有实验页面
export async function generateStaticParams() {
  return experiments.map((experiment) => ({
    slug: experiment.slug,
  }))
}

// 为每个实验生成动态元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const experiment = experiments.find((exp) => exp.slug === slug)

  if (!experiment) {
    return {
      title: "实验未找到",
    }
  }

  const description = experiment.description.slice(0, 160) + (experiment.description.length > 160 ? '...' : '')

  return {
    title: experiment.title,
    description,
    keywords: [...experiment.tags, "实验", "创意编程", "交互设计", ...(experiment.isGraduation ? ["毕业设计"] : [])],
    authors: [{ name: "Anx Forever" }],
    openGraph: {
      title: experiment.title,
      description,
      type: "article",
      url: `${BASE_URL}/lab/${experiment.slug}`,
      siteName: "Anx Forever Blog",
      locale: "zh_CN",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: experiment.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: experiment.title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/lab/${experiment.slug}`,
    },
  }
}

export default async function ExperimentPage({ params }: PageProps) {
  const { slug } = await params
  const experiment = experiments.find((exp) => exp.slug === slug)

  if (!experiment) {
    notFound()
  }

  // 排除 icon 属性（函数无法序列化传递给客户端组件）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...experimentData } = experiment

  return <ExperimentContent experiment={experimentData} />
}
