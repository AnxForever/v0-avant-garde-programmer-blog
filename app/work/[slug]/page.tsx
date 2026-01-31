import { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/lib/data"
import { ProjectContent } from "@/components/project-content"
import { BASE_URL } from "@/lib/url"

interface PageProps {
  params: Promise<{ slug: string }>
}

// 生成静态参数，用于构建时预渲染所有项目页面
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// 为每个项目生成动态元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {
      title: "项目未找到",
    }
  }

  const description = project.description.slice(0, 160) + (project.description.length > 160 ? '...' : '')

  return {
    title: project.title,
    description,
    keywords: [...project.tags, "项目", "作品集", ...(project.isGraduation ? ["毕业设计"] : [])],
    authors: [{ name: "Anx Forever" }],
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `${BASE_URL}/work/${project.slug}`,
      siteName: "Anx Forever Blog",
      locale: "zh_CN",
      images: [
        {
          url: project.image.startsWith('/') ? `${BASE_URL}${project.image}` : project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [project.image.startsWith('/') ? `${BASE_URL}${project.image}` : project.image],
    },
    alternates: {
      canonical: `${BASE_URL}/work/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectContent project={project} />
}
