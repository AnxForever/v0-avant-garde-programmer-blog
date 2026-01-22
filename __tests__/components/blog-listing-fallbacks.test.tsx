import { render, screen } from '@testing-library/react'
import { BlogListingClient } from '@/components/blog-listing-client'
import type { Post } from '@/lib/blog-data'

// Mock the useReducedMotion hook to return true (reduced motion)
jest.mock('@/lib/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(() => true), // Force reduced motion to test static fallbacks
}))

// Don't mock the lazy-loaded components - we want to test the static fallbacks
// which are rendered when prefersReducedMotion is true

describe('Suspense Fallbacks - Blog Listing', () => {
  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      category: 'Tech',
      date: '2025.01.01',
      slug: 'first-post',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'Second Post',
      category: 'AI',
      date: '2025.01.02',
      slug: 'second-post',
      content: 'Content 2',
    },
    {
      id: 3,
      title: 'Third Post',
      category: 'Data',
      date: '2025.01.03',
      slug: 'third-post',
      content: 'Content 3',
    },
  ]

  it('should render static blog cards with correct styling', () => {
    const { container } = render(<BlogListingClient posts={mockPosts} />)

    // Check that cards have the correct Neo-Brutalist styling
    const cards = container.querySelectorAll('.border-black')
    expect(cards.length).toBeGreaterThan(0)

    // Verify shadow classes for Neo-Brutalist look
    const cardWithShadow = container.querySelector('.shadow-\\[4px_4px_0px_0px_rgba\\(0\\,0\\,0\\,1\\)\\]')
    expect(cardWithShadow).toBeInTheDocument()
  })

  it('should display all post information in fallback cards', () => {
    render(<BlogListingClient posts={mockPosts} />)

    // All posts should be visible
    expect(screen.getByText('First Post')).toBeInTheDocument()
    expect(screen.getByText('Second Post')).toBeInTheDocument()
    expect(screen.getByText('Third Post')).toBeInTheDocument()

    // Categories should be visible
    expect(screen.getByText('Tech')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()

    // Dates should be visible
    expect(screen.getByText('// 2025.01.01')).toBeInTheDocument()
    expect(screen.getByText('// 2025.01.02')).toBeInTheDocument()
    expect(screen.getByText('// 2025.01.03')).toBeInTheDocument()
  })

  it('should maintain consistent dimensions to prevent CLS', () => {
    const { container } = render(<BlogListingClient posts={mockPosts} />)

    // Check padding classes that define card dimensions
    const cards = container.querySelectorAll('.p-4')
    expect(cards.length).toBeGreaterThan(0)

    // Check that gap is consistent
    const grid = container.querySelector('.grid.grid-cols-1')
    expect(grid).toBeInTheDocument()
  })

  it('should render expand button fallback with correct dimensions', () => {
    const manyPosts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}`,
      category: 'Tech',
      date: '2025.01.01',
      slug: `post-${i + 1}`,
      content: `Content ${i + 1}`,
    }))

    const { container } = render(<BlogListingClient posts={manyPosts} />)

    // Check that expand button has correct padding and styling
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('px-6', 'py-3')
  })

  it('should have aria-label on expand button for accessibility', () => {
    const manyPosts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}`,
      category: 'Tech',
      date: '2025.01.01',
      slug: `post-${i + 1}`,
      content: `Content ${i + 1}`,
    }))

    const { container } = render(<BlogListingClient posts={manyPosts} />)

    const button = container.querySelector('button')
    expect(button).toHaveAttribute('aria-label')
    expect(button?.getAttribute('aria-label')).toContain('10')
  })

  it('should use CSS transitions instead of framer-motion in fallbacks', () => {
    const { container } = render(<BlogListingClient posts={mockPosts} />)

    // Check that transition classes are present (CSS-based, not framer-motion)
    const cardWithTransition = container.querySelector('.transition-all')
    expect(cardWithTransition).toBeInTheDocument()
    expect(cardWithTransition).toHaveClass('duration-300')
  })

  it('should render READ_FILE call-to-action in each card', () => {
    render(<BlogListingClient posts={mockPosts} />)

    const readFileElements = screen.getAllByText('READ_FILE')
    expect(readFileElements).toHaveLength(mockPosts.length)
  })

  it('should have hover states defined with CSS for progressive enhancement', () => {
    const { container } = render(<BlogListingClient posts={mockPosts} />)

    // Check for hover classes
    const cardWithHover = container.querySelector('.hover\\:shadow-\\[8px_8px_0px_0px_rgba\\(255\\,0\\,255\\,1\\)\\]')
    expect(cardWithHover).toBeInTheDocument()

    const categoryWithHover = container.querySelector('.group-hover\\:bg-accent-yellow')
    expect(categoryWithHover).toBeInTheDocument()
  })
})
