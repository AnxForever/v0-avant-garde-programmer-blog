import { render, screen, waitFor } from '@testing-library/react'
import { lazy, Suspense } from 'react'

// Test dynamic import compatibility
const DynamicExpandButton = lazy(() => import('@/components/expand-button'))

describe('ExpandButton Dynamic Import', () => {
  it('should load via dynamic import', async () => {
    const mockToggle = jest.fn()
    
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicExpandButton
          isExpanded={false}
          onToggle={mockToggle}
          totalPosts={10}
        />
      </Suspense>
    )

    // Should show loading state first
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText(/查看全部 \(10\)/)).toBeInTheDocument()
    })
  })

  it('should be exported as default for next/dynamic compatibility', async () => {
    // Verify the module has a default export (memoized component is an object)
    const module = await import('@/components/expand-button')
    expect(module.default).toBeDefined()
    // React.memo returns an object with $$typeof property
    expect(module.default).toHaveProperty('$$typeof')
  })
})
