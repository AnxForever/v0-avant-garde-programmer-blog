import { render, screen } from '@testing-library/react'
import AnimatedBlogCard from '@/components/animated-blog-card'
import type { Post } from '@/lib/blog-data'

// Mock framer-motion to avoid animation complexities in tests
jest.mock('framer-motion', () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, className, ...props }: any) => {
      // Filter out framer-motion specific props to avoid React warnings
      const { initial: _initial, whileInView: _whileInView, viewport: _viewport, transition: _transition, ...domProps } = props
      return <div className={className} {...domProps}>{children}</div>
    },
  },
}))

describe('AnimatedBlogCard', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Blog Post',
    category: 'Testing',
    date: '2025.01.01',
    slug: 'test-blog-post',
    content: 'This is test content for the blog post.',
  }

  it('should render post title', () => {
    render(<AnimatedBlogCard post={mockPost} index={0} />)
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('should render post category', () => {
    render(<AnimatedBlogCard post={mockPost} index={0} />)
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })

  it('should render post date with comment syntax', () => {
    render(<AnimatedBlogCard post={mockPost} index={0} />)
    expect(screen.getByText('// 2025.01.01')).toBeInTheDocument()
  })

  it('should render READ_FILE call-to-action', () => {
    render(<AnimatedBlogCard post={mockPost} index={0} />)
    expect(screen.getByText('READ_FILE')).toBeInTheDocument()
  })

  it('should render link to blog post', () => {
    render(<AnimatedBlogCard post={mockPost} index={0} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-blog-post')
  })

  it('should apply Neo-Brutalist styling classes', () => {
    const { container } = render(<AnimatedBlogCard post={mockPost} index={0} />)
    const card = container.querySelector('.border-black')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('bg-white')
  })

  it('should render with graduation post', () => {
    const graduationPost: Post = {
      ...mockPost,
      isGraduation: true,
    }
    render(<AnimatedBlogCard post={graduationPost} index={0} />)
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })
})
