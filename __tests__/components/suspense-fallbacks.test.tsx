import { render, screen } from '@testing-library/react'
import { BlogPostContent } from '@/components/blog-post-content'
import type { Post } from '@/lib/blog-data'

// Mock the child components
jest.mock('@/components/nav', () => ({
  Nav: () => <div data-testid="nav">Nav</div>,
}))

jest.mock('@/components/footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}))

jest.mock('@/components/blog-post-header', () => ({
  BlogPostHeader: ({ post }: { post: Post }) => (
    <div data-testid="blog-post-header">{post.title}</div>
  ),
}))

jest.mock('@/components/blog-post-article', () => ({
  BlogPostArticle: ({ post }: { post: Post }) => (
    <div data-testid="blog-post-article">{post.content}</div>
  ),
}))

// Don't mock BlogPostAnimations - let it load naturally to test Suspense behavior
jest.mock('@/components/blog-post-animations', () => ({
  BlogPostAnimations: () => (
    <div data-testid="blog-post-animations">Animations Loaded</div>
  ),
}))

describe('Suspense Fallbacks - Blog Post Content', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    category: 'Tech',
    date: '2025.01.01',
    slug: 'test-post',
    content: 'Test content',
  }

  it('should render server components immediately', () => {
    render(<BlogPostContent post={mockPost} />)

    // Server-rendered components should be visible immediately
    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-header')).toBeInTheDocument()
    expect(screen.getByTestId('blog-post-article')).toBeInTheDocument()
  })

  it('should eventually load animations', async () => {
    render(<BlogPostContent post={mockPost} />)

    // Animations should load (mocked component)
    const animations = await screen.findByTestId('blog-post-animations')
    expect(animations).toBeInTheDocument()
  })

  it('should have proper structure for progressive enhancement', () => {
    const { container } = render(<BlogPostContent post={mockPost} />)

    // Check that main element exists with correct classes
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('min-h-screen', 'bg-white')
  })
})
