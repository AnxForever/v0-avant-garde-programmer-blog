import { render, screen } from '@testing-library/react'
import { BlogPostAnimations } from '@/components/blog-post-animations'

// Mock the useReducedMotion hook
jest.mock('@/lib/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(),
}))

// Mock framer-motion hooks
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
  },
  useScroll: jest.fn(() => ({
    scrollYProgress: {
      get: () => 0.5,
    },
  })),
  useTransform: jest.fn(() => ({
    get: () => 180,
  })),
}))

describe('BlogPostAnimations', () => {
  const { useReducedMotion } = require('@/lib/use-reduced-motion')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when prefers-reduced-motion is false', () => {
    beforeEach(() => {
      useReducedMotion.mockReturnValue(false)
    })

    it('should render progress bar with framer-motion', () => {
      const { container } = render(<BlogPostAnimations />)

      // Should have progress bar
      const progressBar = container.querySelector('.fixed.top-0.left-0.h-4.bg-accent-pink')
      expect(progressBar).toBeInTheDocument()
    })

    it('should render floating scroll indicator on desktop', () => {
      useReducedMotion.mockReturnValue(false)
      const { container } = render(<BlogPostAnimations />)

      // Should have floating element with "SCROLL" text
      const scrollText = screen.getByText('SCROLL')
      expect(scrollText).toBeInTheDocument()

      // Should be hidden on mobile (has 'hidden md:flex' classes)
      const floatingElement = scrollText.closest('.fixed')
      expect(floatingElement).toHaveClass('hidden', 'md:flex')
    })
  })

  describe('when prefers-reduced-motion is true', () => {
    beforeEach(() => {
      useReducedMotion.mockReturnValue(true)
      
      // Mock window.scrollY and document properties
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 500,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: 1000,
      })
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        writable: true,
        value: 3000,
      })
    })

    it('should render static progress bar with CSS transitions', () => {
      const { container } = render(<BlogPostAnimations />)

      // Should have progress bar with transition class
      const progressBar = container.querySelector('.fixed.top-0.left-0.h-4.bg-accent-pink')
      expect(progressBar).toBeInTheDocument()
      expect(progressBar).toHaveClass('transition-all', 'duration-150')
    })

    it('should not render floating scroll indicator', () => {
      render(<BlogPostAnimations />)

      // Should not have "SCROLL" text
      expect(screen.queryByText('SCROLL')).not.toBeInTheDocument()
    })

    it('should use CSS width instead of framer-motion scaleX', () => {
      const { container } = render(<BlogPostAnimations />)

      const progressBar = container.querySelector('.fixed.top-0.left-0.h-4.bg-accent-pink')
      
      // Should have a width style property (not scaleX transform)
      expect(progressBar).toHaveAttribute('style')
      const style = progressBar?.getAttribute('style')
      expect(style).toContain('width')
    })
  })
})
