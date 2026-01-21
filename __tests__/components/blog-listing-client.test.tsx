import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BlogListingClient } from '@/components/blog-listing-client'
import type { Post } from '@/lib/blog-data'

// Mock the useReducedMotion hook
jest.mock('@/lib/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(),
}))

// Mock the lazy-loaded components
jest.mock('@/components/animated-blog-card', () => ({
  __esModule: true,
  default: ({ post }: { post: Post }) => (
    <div data-testid={`animated-card-${post.id}`}>{post.title}</div>
  ),
}))

jest.mock('@/components/expand-button', () => ({
  __esModule: true,
  default: ({ onToggle, isExpanded, totalPosts }: any) => (
    <button onClick={onToggle} data-testid="animated-expand-button">
      {isExpanded ? '收起' : `查看全部 (${totalPosts})`}
    </button>
  ),
}))

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Test Post 1',
    slug: 'test-post-1',
    category: 'Tech',
    date: '2025.01.01',
    content: 'Content 1',
  },
  {
    id: 2,
    title: 'Test Post 2',
    slug: 'test-post-2',
    category: 'AI',
    date: '2025.01.02',
    content: 'Content 2',
  },
  {
    id: 3,
    title: 'Test Post 3',
    slug: 'test-post-3',
    category: 'Data',
    date: '2025.01.03',
    content: 'Content 3',
  },
  {
    id: 4,
    title: 'Test Post 4',
    slug: 'test-post-4',
    category: 'Tech',
    date: '2025.01.04',
    content: 'Content 4',
  },
  {
    id: 5,
    title: 'Test Post 5',
    slug: 'test-post-5',
    category: 'AI',
    date: '2025.01.05',
    content: 'Content 5',
  },
]

describe('BlogListingClient', () => {
  const { useReducedMotion } = require('@/lib/use-reduced-motion')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when prefers-reduced-motion is false', () => {
    beforeEach(() => {
      useReducedMotion.mockReturnValue(false)
    })

    it('should render initial posts with animations', async () => {
      render(<BlogListingClient posts={mockPosts} />)

      // Should show first 4 posts
      await waitFor(() => {
        expect(screen.getByText('Test Post 1')).toBeInTheDocument()
        expect(screen.getByText('Test Post 2')).toBeInTheDocument()
        expect(screen.getByText('Test Post 3')).toBeInTheDocument()
        expect(screen.getByText('Test Post 4')).toBeInTheDocument()
      })

      // Should not show 5th post initially
      expect(screen.queryByText('Test Post 5')).not.toBeInTheDocument()
    })

    it('should show expand button when there are more posts', async () => {
      render(<BlogListingClient posts={mockPosts} />)

      await waitFor(() => {
        expect(screen.getByTestId('animated-expand-button')).toBeInTheDocument()
      })
    })

    it('should expand to show all posts when expand button is clicked', async () => {
      render(<BlogListingClient posts={mockPosts} />)

      const expandButton = await screen.findByTestId('animated-expand-button')
      fireEvent.click(expandButton)

      await waitFor(() => {
        expect(screen.getByText('Test Post 5')).toBeInTheDocument()
      })
    })
  })

  describe('when prefers-reduced-motion is true', () => {
    beforeEach(() => {
      useReducedMotion.mockReturnValue(true)
    })

    it('should render static content without animations', () => {
      render(<BlogListingClient posts={mockPosts} />)

      // Should show first 4 posts with static cards
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
      expect(screen.getByText('Test Post 2')).toBeInTheDocument()
      expect(screen.getByText('Test Post 3')).toBeInTheDocument()
      expect(screen.getByText('Test Post 4')).toBeInTheDocument()

      // Should not load animated components
      expect(screen.queryByTestId('animated-card-1')).not.toBeInTheDocument()
    })

    it('should show static expand button', () => {
      render(<BlogListingClient posts={mockPosts} />)

      const expandButton = screen.getByRole('button', { name: /View all 5 posts/i })
      expect(expandButton).toBeInTheDocument()
      expect(expandButton).not.toHaveAttribute('data-testid', 'animated-expand-button')
    })

    it('should expand to show all posts with static content', async () => {
      render(<BlogListingClient posts={mockPosts} />)

      const expandButton = screen.getByRole('button', { name: /View all 5 posts/i })
      fireEvent.click(expandButton)

      await waitFor(() => {
        expect(screen.getByText('Test Post 5')).toBeInTheDocument()
      })

      // Button text should change to "Collapse posts"
      expect(screen.getByRole('button', { name: /Collapse posts/i })).toBeInTheDocument()
    })

    it('should collapse posts when collapse button is clicked', async () => {
      render(<BlogListingClient posts={mockPosts} />)

      // Expand first
      const expandButton = screen.getByRole('button', { name: /View all 5 posts/i })
      fireEvent.click(expandButton)

      await waitFor(() => {
        expect(screen.getByText('Test Post 5')).toBeInTheDocument()
      })

      // Then collapse
      const collapseButton = screen.getByRole('button', { name: /Collapse posts/i })
      fireEvent.click(collapseButton)

      await waitFor(() => {
        expect(screen.queryByText('Test Post 5')).not.toBeInTheDocument()
      })
    })
  })

  describe('with fewer than 4 posts', () => {
    const fewPosts = mockPosts.slice(0, 3)

    it('should not show expand button', () => {
      useReducedMotion.mockReturnValue(false)
      render(<BlogListingClient posts={fewPosts} />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should not show expand button with reduced motion', () => {
      useReducedMotion.mockReturnValue(true)
      render(<BlogListingClient posts={fewPosts} />)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })
})
