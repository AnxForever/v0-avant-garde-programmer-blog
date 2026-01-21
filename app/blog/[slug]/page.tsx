import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCachedPost, getCachedPostSlugs, extractDescription } from "@/lib/blog-data"
import { BlogPostContent } from "@/components/blog-post-content"

const BASE_URL = 'https://anxforever-blog.vercel.app'

interface PageProps {
  params: Promise<{ slug: string }>
}

// 生成静态参数，用于构建时预渲染所有博客文章
export async function generateStaticParams() {
  const slugs = getCachedPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// 为每个博客文章生成动态元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getCachedPost(slug)

  if (!post) {
    return {
      title: "文章未找到",
    }
  }

  // 使用缓存的描述提取函数
  const description = extractDescription(post.content, 160)

  return {
    title: post.title,
    description,
    keywords: [post.category, "博客", "技术文章", ...(post.isGraduation ? ["毕业设计", "BERT", "AI检测"] : [])],
    authors: [{ name: "Anx Forever" }],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date.replace(/\./g, '-'),
      authors: ["Anx Forever"],
      url: `${BASE_URL}/blog/${post.slug}`,
      siteName: "Anx Forever Blog",
      locale: "zh_CN",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getCachedPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
